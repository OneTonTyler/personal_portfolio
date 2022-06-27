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
exports.newEntry = (values, table) => {
    const sql = `INSERT INTO ${table} (ID, TITLE, DESCRIPTION, CONTENT, DATE_CREATED, DATE_EDITED) VALUES ?`;

    database.query(sql, [values], (err, results) => {
        if (err) throw err;

        console.log('Data submitted.');
    });
};

// Read database
exports.getByTable = (table) => {
    const sql = `SELECT * FROM ${table}`;

    database.query(sql, (err, results) => {
        if (err) throw err;

        console.log(results);
    });
};

// Update database
exports.patchById = (table, cols, values, id) => {
    cols.forEach((col, idx) => {
        if (col === 'ID') return; // Do not allow for changing id

        const sql = `UPDATE ${table} SET ${col} = '${values[idx]}' WHERE ID = ${id}`;
        database.query(sql, (err, results) => {
            if (err) throw err;

            console.log(`Column ${col} updated to ${values[idx]}`);
        });
    });
};

// Delete entry
exports.removeById = (table, id) => {
    const sql = `DELETE FROM ${table} WHERE ID = ${id}`;

    database.query(sql, (err, results) => {
        if (err) throw err;

        console.log('Entry deleted.');
    });
};