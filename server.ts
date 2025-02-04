import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from './routes/users.route';
import courseRouter from './routes/course.route';
import { createServer } from "http";
import { Server } from "socket.io";
import { PaymentData } from './interfaces/payment.interface';
import paymentRouter from './routes/payment.route';
import useragent from 'useragent';

// Load environment variables
dotenv.config();

// Ensure environment variables are properly loaded
const store_id = process.env.STORE_ID || ''; // Provide a default or fallback value
const store_passwd = process.env.STORE_PASSWORD || ''; // Provide a default or fallback value

if (!store_id || !store_passwd) {
  throw new Error("STORE_ID and STORE_PASSWORD must be defined in the environment variables.");
}

const is_live = false;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/v1/', router);
app.use('/api/v1/', courseRouter);
app.use('/api/v1/', paymentRouter);

// MongoDB connection process
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
  },
});

io.on('connection', (socket) => {
  const userAgentString = socket.handshake.headers["user-agent"];
  const agent = useragent.parse(userAgentString);
  const os = agent.os

  const deviceInfo = {
    ip: socket.handshake.address,
    userAgent: socket.handshake.headers["user-agent"],
    os: os,
  };
  socket.emit("deviceInfo", deviceInfo);
  activeUsers++;
  io.emit('activeUsers', activeUsers);

  socket.on('disconnect', () => {
    activeUsers--;
    io.emit("activeUsers", activeUsers);
  });
});


// Payment gateway initialization
// app.post('/init', async (req: Request, res: Response): Promise<void> => {
//   const transactionId = `tran_${Date.now()}`;
//   const payload: PaymentData = {
//     total_amount: req.body.amount,
//     currency: "BDT",
//     tran_id: transactionId,
//     success_url: `http://localhost:5000/api/v1/payment/success/${transactionId}`,
//     fail_url: process.env.FAIL_URL || "http://localhost:5000/fail",
//     cancel_url: process.env.CANCEL_URL || "http://localhost:5000/cancel",
//     ipn_url: process.env.IPN_URL || "http://localhost:5000/payment/ipn",
//     product_name: req.body.courseName,
//     product_category: "Education",
//     product_profile: "general",
//     cus_name: req.body.name,
//     cus_email: req.body.email,
//     cus_phone: req.body.phone,
//     cus_add1: req.body.address || "Default Address",
//     cus_city: req.body.city || "Default City",
//     cus_country: req.body.country || "Bangladesh",
//     shipping_method: "NO", // Optional field
//   };
  
  
  
  
  

//   const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

//   try {
//     const apiResponse = await sslcz.init(payload);

//     const { GatewayPageURL } = apiResponse;
//     if (GatewayPageURL) {
//       res.status(200).json({ url: GatewayPageURL });
//     } else {
//       res.status(400).json({ message: 'Failed to create payment session', apiResponse });
//     }
//   } catch (error) {
//     console.error('Payment initialization error:', error);
//     res.status(500).json({ message: 'Payment initialization failed', error });
//   }

  
// });
// // Define this outside the `/init` route
app.post('/api/v1/payment/success/:tran_id', async (req: Request, res: Response) => {
  const { tran_id } = req.params;
  const { status } = req.body;
  console.log(req.body);
  if (status === 'VALID') {
    res.status(200).json({ message: 'Payment successful', tran_id });
  } else {
    res.status(400).json({ message: 'Payment failed', tran_id });
  }
});

// app.post('/payment/ipn', async (req: Request, res: Response) => {
//   console.log('IPN Request:', req.body);
//   // Validate and process the transaction based on the request body
//   res.status(200).send('IPN received');
// });

// Start the server with the specified port
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});
