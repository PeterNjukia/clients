const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

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

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.post('/api/clients', (req, res) => {
    const { tenant_name, phone, house_number, comments, rent_paid } = req.body;
    const query = 'INSERT INTO clients (tenant_name, phone, house_number, comments, rent_paid) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [tenant_name, phone, house_number, comments, rent_paid], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, tenant_name, phone, house_number, comments, rent_paid, date: new Date() });
    });
});

app.delete('/api/clients/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM clients WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

app.put('/api/clients/:id', (req, res) => {
    const { id } = req.params;
    const { tenant_name, phone, house_number, comments, rent_paid } = req.body;
    const query = 'UPDATE clients SET tenant_name = ?, phone = ?, house_number = ?, comments = ?, rent_paid = ? WHERE id = ?';
    connection.query(query, [tenant_name, phone, house_number, comments, rent_paid, id], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
