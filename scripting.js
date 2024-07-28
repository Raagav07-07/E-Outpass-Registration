const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const app = express();


app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'index.html');
    fs.readFile(htmlFilePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).send(data);
    });
});


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Raagav@358415",
    database: "student"
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); 
    }
    console.log('MySQL connected');
});


app.post('/submit-form', (req, res) => {
    const { name, department, outdate, outtime, indate, intime,reason, email } = req.body;
    const sql = 'INSERT INTO student (name, department, outdate, outtime, indate, intime,reason,email) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, department, outdate, outtime, indate, intime,reason, email], (err, result) => {
        if (err) {
            console.error('Error inserting form data:', err);
            res.status(500).send('Error saving form data');
            return;
        }
        res.status(200).send('Form data saved successfully!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
