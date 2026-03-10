import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/user.routes.js';


dotenv.config();

const app = express();

app.use(postRoutes);

app.use(userRoutes);

app.use(cors());
 
app.use(express.json());

const start = async () => {
  
    const connectDB = await mongoose.connect("mongodb+srv://anjalisaini0192_db_user:y1DOgfeuRpPs4gBr@apnaproconnect.zqireqv.mongodb.net/?appName=apnaproconnect");

    app.listen(9080, () => {
        console.log("Server is running on port 9080");
    })
}

start();