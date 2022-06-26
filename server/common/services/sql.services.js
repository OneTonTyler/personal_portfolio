require('dotenv').config({path: './server/common/config/.env'});

const mysql = require('mysql');

const connection = mysql.createConnection({
        port: '3306',
        host: 'localhost',
        user: 'OneTonTyler',
        password: 'SecretPassword',
        database: 'projects'
});

exports.connect = () => {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }

        console.log('connected as id ' + connection.threadId);
    });
};