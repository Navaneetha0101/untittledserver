const mongoose = require("mongoose");
//const URI = "mongodb://127.0.0.1:27017/untittled";
const URI = process.env.MONGODB_URI;
const connectDb = async()=>{
  try{
   await mongoose.connect(URI);
   console.log("Database Connection Successfull");
  }catch(error){
    console.error("Database Connection Failed");
    process.exit(0);
  }
};
module.exports = connectDb;