import express from 'express';
import cors from 'cors';
const app=express();
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './routes/userRoute.js';
import connectDB from './database/db.js';
const PORT=process.env.PORT||3000;

connectDB();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log("server is running on the port 3000");
})
