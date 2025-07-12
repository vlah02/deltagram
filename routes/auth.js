const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.send('Username and password required');

    const hash = await bcrypt.hash(password, 10);

    db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hash],
        function (err) {
            if (err) {
                console.error(err);
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.send('Username already exists.');
                }
                return res.send('Error: ' + err.message);
            }
            req.session.user = { id: this.lastID, username };
            res.redirect('/');
        }
    );
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, user) => {
            if (err) {
                console.error(err);
                return res.send('Error: ' + err.message);
            }
            if (!user) return res.send('No such user.');

            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.send('Wrong password.');

            req.session.user = { id: user.id, username: user.username };
            res.redirect('/');
        }
    );
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;
