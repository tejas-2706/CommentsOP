// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234567890',
//     database: 'comments_op'
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database: ' + err.stack);
//         return;
//     }
//     console.log('Connected to the database as id ' + connection.threadId);

// });


// const createCommentsTable = () => {
//     const createTableQuery = `CREATE TABLE IF NOT EXISTS comments (
//            id INT AUTO_INCREMENT PRIMARY KEY,
//            username VARCHAR(255),
//            comment TEXT,
//            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
//         )`
//     connection.query(createTableQuery, (error, results) => {
//         if (error) {
//             console.error('Error creating table: ' + error.stack);
//         } else {
//             console.log('Table created successfully or already exists.');
//         }
//     });
// }

// createCommentsTable();

// connection.end();

// module.exports = connection















// // db.js
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234567890',
//   database: 'comments_op',
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database: ' + err.stack);
//     return;
//   }
//   console.log('Connected to the database as id ' + connection.threadId);
// });

// // Create comments table if it doesn't exist
// const createCommentsTable = () => {
//   const createTableQuery = `CREATE TABLE IF NOT EXISTS comments (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(255),
//     comment TEXT,
//     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
//   )`;
  
//   connection.query(createTableQuery, (error, results) => {
//     if (error) {
//       console.error('Error creating table: ' + error.stack);
//     } else {
//       console.log('Table created successfully or already exists.');
//     }
//   });
// };

// createCommentsTable();

// module.exports = connection;
