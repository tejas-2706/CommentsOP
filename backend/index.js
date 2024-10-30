const express = require('express');
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io');
const connection = require('./db');


const app = express()
app.use(express.json());
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

app.post('/api/comment', (req, res) => {
    const { username, comment } = req.body;
    if (!username || !comment) {
      return res.status(400).json({ error: 'Username and comment are required.' });
    }
    const insertQuery = `INSERT INTO comments (username, comment) VALUES (?, ?)`;
    connection.query(insertQuery, [username, comment], (error, results) => {
        if (error) {
            console.error('Error inserting comment: ' + error.stack);
            return res.status(500).json({ error: 'Error inserting comment' });
        }
        res.status(200).json({ message: 'Comment added successfully!', id: results.insertId });
    });
});

app.get('/api/commentslist', (req,res)=>{
    const selectQuery = `SELECT username,comment FROM comments`;
    connection.query(selectQuery, (error,results) => {
        if (error) {
            console.error('Error fetching comments: ' + error.stack);
            return res.status(500).json({ error: 'Error fetching comments' });
        }
        res.status(200).json(results);
    });
})

server.listen(3000,()=>{
    console.log("Running on Port 3000");
})


















