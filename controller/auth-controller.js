const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const home = async(req, res) =>{
    try{
        res.status(200).send(" home WELCOMES YOU");
    }catch(error){
       console.log(error);
    }
}

const register = async(req, res)=>{
    try{
        console.log(req.body);
        const {username, emailid, phone, password} = req.body;
        const userExist =await User.findOne({ emailid });
        if(userExist){
            return res.status(400).json({msg:"Email alreaddy exists"})
        }
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);
        const userCreated = await User.create({username, emailid, phone, password});
        res.status(201).json({
             msg: "Registration successful", 
             token : await userCreated.generateToken() , 
             userId:userCreated._id.toString(),
            });
    }catch(error){
        console.log(error);
        res.status(400).json("INTERNAL SERVER ERROR");
    }
    
}

const login = async(req, res)=>{
    try{
      const {emailid, password} = req.body;
      const userExist = await User.findOne({emailid});
      console.log(userExist);
      if(!userExist){
        return res.status(400).json({msg:"Invalid Credentials"});
      }
      const user = await bcrypt.compare(password, userExist.password)
       if(user){
        res.status(200).json({
            msg:"Login Successful",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
        })
       }else{
        res.status(401).json({msg:"Invalid email or password"});
       }
    }catch(error){
        console.log(error);
        res.status(400).json("INTERNAL SERVER ERROR");
    }
}

const user = async(req, res)=>{
    try{
     const userData = req.user;
     console.log(userData);
     return res.status(200).json({userData});
    }catch(error){
        console.log(`error from user route,${error}`);
    }
}
module.exports = { home, register, login, user };