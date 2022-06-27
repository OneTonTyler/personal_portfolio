/* Connects to mySQL database for saving project and blog posts
 *
 * Project and Blog Table
 * -Title
 * -Description
 * -Content
 * -Date Created
 * -Date Edited
 * -Role (Project or Blog)
 * */

// Get environment variables
require('dotenv').config({path: './server/common/config/.env'});

// Establish connection
const mysql = require('mysql');
const database = mysql.createConnection({
    port: '3306',
    host: 'localhost',
    user: 'OneTonTyler',        // Temporary for prototyping
    password: 'SecretPassword', // Temporary for prototyping
    database: 'resource'
});

exports.connect = () => {
    database.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            process.exit(1);
        }

        console.log('Successfully connected to the database');
    });
};

exports.newEntry = (entry) => {
    const sql = 'INSERT INTO webpage (id, title, description, content, date_created, date_edited, role) VALUES ?';
    const values = entry;

    database.query(sql, [values], (err, results) => {
        if (err) throw err;

        console.log('Data submitted: ' + results);
    });
};