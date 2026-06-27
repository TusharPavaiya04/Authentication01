import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db2.js';
dotenv.config();
const app=express();
connectDB();
app.use(express.json());
const port=process.env.PORT||3000;

app.get('/',(req,res)=>{
    res.send("Hello everyone how are you");
})

app.listen(port,()=>{
    console.log(`serveris running on the port ${port}`);
})