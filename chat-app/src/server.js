const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  socket.on('typing', ({ username, status }) => {
    io.emit('typing', { username, status });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));
