const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');

    const sql = `
        SELECT diffs.*,
               u1.created_at AS from_date,
               u2.created_at AS to_date
        FROM diffs
                 JOIN uploads u1 ON diffs.from_upload_id = u1.id
                 JOIN uploads u2 ON diffs.to_upload_id = u2.id
        WHERE diffs.user_id = ?
        ORDER BY diffs.id DESC
    `;

    const uploadsSql = `
    SELECT * FROM uploads WHERE user_id = ? ORDER BY created_at DESC
  `;

    db.all(sql, [req.session.user.id], (err, diffs) => {
        if (err) {
            console.error(err);
            return res.send('DB error.');
        }

        db.all(uploadsSql, [req.session.user.id], (err, uploads) => {
            if (err) {
                console.error(err);
                return res.send('DB error.');
            }

            res.render('index', { user: req.session.user, diffs, uploads });
        });
    });
});


module.exports = router;
