import express from 'express';
import db from './database/db2.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app=express();

app.use(cors());

const PORT=process.env.PORT||3000;
db(process.env.MONGO_URI);

app.get('/',(req,res)=>{
res.send("Hello everyone, How are you");    
})

app.listen(PORT,()=>{
    console.log("server is running on the port 3000");
})
