// require('dotenv').config({path: './server/common/config/.env'});
//
// const mysql = require('mysql');
//
// const connection = mysql.createConnection({
//         port: '3306',
//         host: 'localhost',
//         user: 'OneTonTyler',
//         password: 'SecretPassword',
//         database: 'projects'
// });
//
// exports.connect = function() {
//     connection.connect(function (err) {
//         if (err) {
//             console.error('error connecting: ' + err.stack);
//             process.exit(1);
//         }
//         console.log('Successfully connected to the database.');
//     });
// };
//
// exports.query = () => {
//     connection.query('SELECT * FROM projects.project_table', (err, rows) => {
//         if (err) throw err;
//
//         console.log('Data received from database:');
//         console.log(rows);
//     });
// };
