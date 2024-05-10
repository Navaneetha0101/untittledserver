const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    emailid:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

userSchema.pre('save',async function(){
console.log("data about to save is", this);
const user = this;
if(!user.isModified("password")){
    next(); //store data in db
}
//if password is newly created
try{
    const saltRound = await bcrypt.genSalt(10) ;
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
}catch(error){
next(error);
}
});

userSchema.methods.generateToken = async function(){
  try{
   return jwt.sign({
    userId: this._id.toString(),
    email : this.emailid,
    isAdmin: this.isAdmin,
   },
   process.env.JWT_SECRET_KEY,
   {
    expiresIn: "30d",
   }
)
  }catch(error){
    console.error(error);
  };
};
// userSchema.methods.comparePassword = async function(password){
//     return bcrypt.compare(password, this.password)
// }
const User = new mongoose.model("User",userSchema);
module.exports = User;