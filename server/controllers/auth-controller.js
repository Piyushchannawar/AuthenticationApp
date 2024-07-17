const User = require("../models/Usermodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const signUp = async(req,res)=>{

    try {
        const {name,email,password} = req.body;
       // Checking if user already exesting
        
       let existingUser;
       try {
        existingUser = await User.findOne({ email });
       } catch (error) {
        console.log(error);
       }
      
       if(existingUser){
        res.status(400).json({ message:"User already exist"});
       }

       // hashing the password
       const hashedPassword = await bcrypt.hash(password, 10)

       // creating a new user
   const user = new User({
    name,
    email,
    password : hashedPassword,
   });
   await user.save();
   res.status(201).json({user});
    } catch (error) {
        console.log(error);
    }
   
    

}

const login = async(req,res)=>{
    const {email,password} = req.body;
   
    let existingUser;
    // Check if User already exist
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error.message);
    }

    if(!existingUser){
    return res.status(404).json({message : "User does not exist"});
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    )

    if(!isPasswordCorrect){
     return   res.status(400).json({ message: "Invalid credentials"});
    }
    // Creating a Token
    const token = jwt.sign({id : existingUser._id },process.env.JWT_SECRET_KEY,{
        expiresIn: "1h",
    });
  
    res.cookie(String(existingUser.id), token , {
        path:"/",
        expires: new Date(Date.now() + 1000*30),
        httpOnly: true,
        sameSite: "lax",
    });
    
    return res.status(200).json({message : "Sucessfully logged in"});


}

module.exports = {
    signUp,
    login,
}