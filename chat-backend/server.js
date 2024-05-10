// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const http = require('http'); // Import the http module
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app); // Create a server using the express app
const io = socketIo(server); // Initialize Socket.io with the server

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
  console.log('Connected to MongoDB');

  // Socket.io connection event
  io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle message event
    socket.on('message', (data) => {
      console.log('Message received:', data);
      // Broadcast the message to all connected clients
      io.emit('message', data);
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  // Start the server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error(err.message));
