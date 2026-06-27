import mongoose from "mongoose";

const userSchema=new mongoose.create({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    otp:{type:String,required:true},
    isVerified:{type:Boolean,default:false},
    isLoggedIn:{type:Boolean,default:false},
    token:{type:String,default:null},
    otpExpiry:{type:Date,default:null},
},{Timestamp:true})

const userModel= mongoose.model("User",userSchema);


export default userModel;