import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from './routes/users.route';
import courseRouter from './routes/course.route';
import {createServer } from "http";
import {Server} from "socket.io";
import SSLCommerzPayment from 'sslcommerz-lts';
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASSWORD
const is_live = false
// Configure environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Register and login routes
app.use('/api/v1/', router)
app.use('/api/v1/', courseRouter)



// MongoDB connection
const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2m0rny5.mongodb.net/learnCode`;
    await mongoose.connect(uri);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

// Socket.io connection
let activeUsers = 0;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  }
})
io.on('connection', (socket) => {
  activeUsers++;
  io.emit('activeUsers', activeUsers);
  socket.on('disconnect', () => {
    activeUsers--;
   // Update all clients with the new active user count
    io.emit("activeUsers", activeUsers);
  })
})
// Start the server with the specified port
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});
