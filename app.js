const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Default port to 3000 if PORT is not defined in .env

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

app.get('/clients', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/clients', (req, res) => {
    const query = 'SELECT * FROM clients';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
