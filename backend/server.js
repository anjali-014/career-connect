// Import required dependencies

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import application routes

import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/user.routes.js';

// Load environment variables from .env file

dotenv.config();

// Initialize express application

const app = express();


// Enable CORS to allow frontend requests

app.use(cors());

// Parse incoming JSON requests
 
app.use(express.json());

// Register application routes

app.use("/user", userRoutes);

app.use("/post", postRoutes);

app.use("/uploads", express.static("uploads"));

// Start server and connect to MongoDB
const start = async () => {
  
    const connectDB = await mongoose.connect("mongodb+srv://anjalisaini0192_db_user:y1DOgfeuRpPs4gBr@apnaproconnect.zqireqv.mongodb.net/?appName=apnaproconnect");

    app.listen(9090, () => {
        console.log("Server is running on port 9090");
    })
}

start();