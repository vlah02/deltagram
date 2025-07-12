const express = require('express');
const multer = require('multer');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const db = require('../db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.array('zipfiles'), async (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');

    const userId = req.session.user.id;

    for (const file of req.files) {
        const zipPath = file.path;

        const hash = hashFile(zipPath);

        const duplicate = await checkDuplicate(userId, hash);
        if (duplicate) {
            console.log(`Duplicate zip skipped: ${file.originalname}`);
            continue;
        }

        const baseName = file.originalname;
        const dateMatch = baseName.match(/20\d{2}-\d{2}-\d{2}/);

        let realDate = new Date().toISOString();
        if (dateMatch) {
            realDate = dateMatch[0];
        }

        const uploadId = Date.now().toString() + '_' + Math.floor(Math.random() * 100000);

        const extractPath = `data/${userId}/${uploadId}`;

        console.log(`Extracting ${zipPath} to ${extractPath}`);

        await fs.createReadStream(zipPath)
            .pipe(unzipper.Extract({ path: extractPath }))
            .promise();

        db.run(
            'INSERT INTO uploads (user_id, filename, created_at, file_hash) VALUES (?, ?, ?, ?)',
            [userId, uploadId, realDate, hash],
            (err) => {
                if (err) console.error(err);
            }
        );
    }

    db.all(
        'SELECT * FROM uploads WHERE user_id = ? ORDER BY created_at ASC',
        [userId],
        (err, uploads) => {
            if (err) {
                console.error(err);
                return res.send('DB error during select.');
            }

            for (let i = 0; i < uploads.length - 1; i++) {
                const oldU = uploads[i];
                const newU = uploads[i + 1];

                const oldBase = `data/${userId}/${oldU.filename}/connections/followers_and_following/`;
                const newBase = `data/${userId}/${newU.filename}/connections/followers_and_following/`;

                const oldFollowers = extractUsers(oldBase + 'followers_1.json');
                const newFollowers = extractUsers(newBase + 'followers_1.json');
                const oldFollowing = extractUsers(oldBase + 'following.json');
                const newFollowing = extractUsers(newBase + 'following.json');

                const followersAdded = newFollowers.filter(x => !oldFollowers.includes(x));
                const followersRemoved = oldFollowers.filter(x => !newFollowers.includes(x));
                const followingAdded = newFollowing.filter(x => !oldFollowing.includes(x));
                const followingRemoved = oldFollowing.filter(x => !newFollowing.includes(x));

                db.get(
                    'SELECT id FROM diffs WHERE from_upload_id = ? AND to_upload_id = ?',
                    [oldU.id, newU.id],
                    (err, row) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        if (!row) {
                            db.run(
                                `INSERT INTO diffs (user_id, from_upload_id, to_upload_id,
                                                    followers_added, followers_removed,
                                                    following_added, following_removed)
                                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                [
                                    userId,
                                    oldU.id,
                                    newU.id,
                                    JSON.stringify(followersAdded),
                                    JSON.stringify(followersRemoved),
                                    JSON.stringify(followingAdded),
                                    JSON.stringify(followingRemoved)
                                ],
                                (err) => {
                                    if (err) console.error(err);
                                }
                            );
                        }
                    }
                );
            }

            res.redirect('/');
        }
    );
});

router.post('/delete/:id', (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');

    const id = req.params.id;
    const userId = req.session.user.id;

    db.get('SELECT * FROM uploads WHERE id = ? AND user_id = ?', [id, userId], (err, row) => {
        if (err) {
            console.error(err);
            return res.send('DB error.');
        }
        if (!row) {
            return res.send('Not found.');
        }

        const folderPath = `data/${userId}/${row.filename}`;
        fs.rmSync(folderPath, { recursive: true, force: true });

        db.run('DELETE FROM uploads WHERE id = ?', [id], (err) => {
            if (err) {
                console.error(err);
                return res.send('DB error.');
            }
            db.run('DELETE FROM diffs WHERE from_upload_id = ? OR to_upload_id = ?', [id, id]);

            res.redirect('/');
        });
    });
});


function hashFile(path) {
    const data = fs.readFileSync(path);
    return crypto.createHash('sha256').update(data).digest('hex');
}

function checkDuplicate(userId, hash) {
    return new Promise((resolve) => {
        db.get(
            'SELECT id FROM uploads WHERE user_id = ? AND file_hash = ?',
            [userId, hash],
            (err, row) => {
                if (err) {
                    console.error(err);
                    return resolve(false);
                }
                resolve(!!row);
            }
        );
    });
}

function extractUsers(filePath) {
    try {
        const raw = fs.readFileSync(filePath);
        const data = JSON.parse(raw);

        if (Array.isArray(data)) {
            if (data[0]?.string_list_data) {
                return data.map(x => x.string_list_data[0].value);
            }
        } else if (data.relationships_following) {
            return data.relationships_following.map(x => x.string_list_data[0].value);
        }

    } catch {
        console.warn(`Could not read or parse: ${filePath}`);
    }

    return [];
}

module.exports = router;
