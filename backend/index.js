const express = require('express');
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io');
const connection = require('./db');


const app = express()
app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001", // Frontend URL
      methods: ["GET", "POST"],
      credentials: true
    }
  });

io.on('connection', (socket)=>{
    console.log("new user connected");
    socket.on('comment',({username,comment})=>{
        // console.log(comment);
        io.emit('comment',{username,comment});
    })
    // Socket.on('disconnect', ()=>{
    //     console.log("User disconnected");
    // })
})


app.get('/',(req,res)=>{
    res.send("hey, there")
})

// app.post('/comment', (req,res)=>{
//     const {username, comment} = req.body;
//     const insertQuery = `INSERT INTO comments (username, comment) VALUES (${username}, ${comment})`;
//     connection.query(insertQuery, [username, comment], (error, results) => {
//         if (error) {
//           console.error('Error inserting comment: ' + error.stack);
//           return res.status(500).json({ error: 'Error inserting comment' });
//         }
//         res.status(200).json({ message: 'Comment added successfully!', id: results.insertId });
//       });
// })

server.listen(3000,()=>{
    console.log("Running on Port 3000");
})


















// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root', // replace with your MySQL username
//     password: '1234567890', // replace with your MySQL password
// });

// // Connect to MySQL and create database and table if they don't exist
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to MySQL.');

//     // Create database
//     db.query('CREATE DATABASE IF NOT EXISTS comments_op', (err) => {
//         if (err) {
//             console.error('Error creating database:', err);
//             return;
//         }

//         // Use the database
//         db.query('USE comments_op', (err) => {
//             if (err) {
//                 console.error('Error using database:', err);
//                 return;
//             }

//             // Create a table if it doesn't exist
//             const createTableQuery = `
//                 CREATE TABLE IF NOT EXISTS comments (
//                     id INT AUTO_INCREMENT PRIMARY KEY,
//                     username VARCHAR(255) NOT NULL,
//                     comment TEXT NOT NULL,
//                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//                 )
//             `;
//             db.query(createTableQuery, (err) => {
//                 if (err) {
//                     console.error('Error creating table:', err);
//                     return;
//                 }
//                 console.log('Table created or already exists.');
//             });
//         });
//     });
// });

// // Socket.io connection handling
// io.on('connection', (socket) => {
//     console.log('New user connected');

//     // Handle incoming messages or comments
//     socket.on('new_comment', (data) => {
//         const { username, comment } = data;

//         // Insert the new comment into the database
//         const insertQuery = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
//         db.query(insertQuery, [username, comment], (err) => {
//             if (err) {
//                 console.error('Error inserting comment:', err);
//                 return;
//             }
//             // Emit the new comment to all connected clients
//             io.emit('comment_added', { username, comment });
//         });
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// // Start the server
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Running on Port ${PORT}`);
// });
