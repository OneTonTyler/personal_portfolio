/* Connects to mySQL database for saving project and blog posts
 *
 * Project and Blog Table
 * -Title
 * -Description
 * -Content
 * -Date Created
 * -Date Edited
 * -Type (Project, Blog, or something else)
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

// Create entry
exports.newEntry = (values) => {
    const sql = 'INSERT INTO webpage (ID, TITLE, DESCRIPTION, CONTENT, DATE_CREATED, DATE_EDITED, TYPE) VALUES ?';

    database.query(sql, [values], (err, results) => {
        if (err) throw err;

        console.log('Data submitted.');
    });
};

// Read database
exports.getByType = (value) => {
    const sql = `SELECT * FROM webpage WHERE TYPE = '${value}'`;

    database.query(sql, (err, results) => {
        if (err) throw err;

        console.log(results);
    });
};