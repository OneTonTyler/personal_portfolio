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
exports.newEntry = (table, values) => {
    const sql = `INSERT INTO ${table} (ID, TITLE, DESCRIPTION, CONTENT, DATE_CREATED, DATE_EDITED) VALUES ?`;

    return new Promise((resolve, reject) => {
        database.query(sql, [values], (err, results) => {
            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

// Read database
exports.getByTable = (table) => {
    const sql = `SELECT * FROM ${table}`;

    return new Promise((resolve, reject) => {
        database.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }

            resolve(results)
        });
    });
};

// Update database
exports.patchById = (table, cols, values, id) => {
    const idx = cols.length;
    const entries = [];

    for (let i = 0; i < idx; i++) {
        entries.push(`${cols[i]} = '${values[i]}'`)
    }

    return new Promise((resolve, reject) => {
        const sql = `UPDATE ${table} SET ${entries.join(', ')} WHERE ID = ${id}`;

        database.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};

// Delete entry
exports.removeById = (table, id) => {
    const sql = `DELETE FROM ${table} WHERE ID = ${id}`;

    return new Promise((resolve, reject) => {
        database.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};