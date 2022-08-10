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
exports.newEntry = (table, columns, values, id) => {
    const entries = [id].concat(values.map(value => `'${value}'`));
    const sql = `INSERT INTO ${table} (ID, ${columns}) VALUES (${entries})`;

    return new Promise((resolve, reject) => {
        database.query(sql, (err, results) => {
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

// Read a single entry
exports.getById = (table, id) => {
    const sql = `SELECT * FROM ${table} WHERE ID = ${id}`;

    return new Promise((resolve, reject) => {
        database.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }

            resolve(results[0]);
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
        console.log(sql)
        console.log()

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

// Delete all entries in table
exports.clearTable = (table) => {
    const sql = `TRUNCATE TABLE ${table}`;

    return new Promise((resolve, reject) => {
        database.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }

            resolve(results);
        });
    });
};