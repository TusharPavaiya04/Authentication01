import mongoose from 'mongoose';
const connectDB=async()=>{
    try{
    await mongoose.connect(`${process.env.MONGO_URI}/authentication`);
    console.log("database is connected successfully");
    
    }catch(err){
        console.log(err);
    }
}

export default connectDB;