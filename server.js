const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Un usuario se conectó');

  socket.on('chat message', (msg) => {
    console.log('Mensaje recibido: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se desconectó');
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
