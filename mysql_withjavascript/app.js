const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(
    session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false,
    })
);

// Database configuration
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'myapp',
    
});

// Routes
app.use(express.static('public')); // Serve static files, such as your HTML, CSS, and JavaScript

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const [results] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Incorrect username or password.' });
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        res.send(`Welcome, ${req.session.username}! This is your dashboard.`);
    } else {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
