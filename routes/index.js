const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    const userId = req.session.user.id;

    db.all('SELECT * FROM uploads WHERE user_id = ? ORDER BY created_at ASC', [userId], (err, uploads) => {
        if (err) {
            console.error(err);
            return res.send('DB error.');
        }

        db.all(`
            SELECT diffs.*, u1.created_at as from_date, u2.created_at as to_date
            FROM diffs
                     JOIN uploads u1 ON diffs.from_upload_id = u1.id
                     JOIN uploads u2 ON diffs.to_upload_id = u2.id
            WHERE diffs.user_id = ?
            ORDER BY u1.created_at ASC
        `, [userId], (err, diffs) => {
            if (err) {
                console.error(err);
                return res.send('DB error.');
            }

            const history = uploads.map(upload => ({
                date: upload.date || upload.created_at,
                followers: upload.followers_count || 0,
                following: upload.following_count || 0,
            })).sort((a, b) => new Date(a.date) - new Date(b.date));

            res.render('index', { files: uploads, diffs: diffs, history: history });
        });
    });
});

module.exports = router;
