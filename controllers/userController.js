const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');


exports.getAllUsers= async (req,res)=>{
  try{
    const users = await userModel.find({})
    return res.status(200).send({
        userCount:users.length,
        success:true,
        message:"All users fetched successfully",
        users
    })

  } 
  catch(error){
    console.log(`error has occured - ${error}`);
    return res.status(500).send({
        message:"error 500 occured-in get allusers",
        success:false,
        error
    });
  } 
};


exports.registorController= async (req,res)=>{
    try{
        const {username,email,password}=req.body

        if(!username || !email || !password){
            return res.status(400).send({
                message:'Please fill all details',
                success:false,
            })
        }

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                message:'user already exists',
                success:false,
                error
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user= new userModel({username,email,password:hashedPassword});
        await user.save();
        return res.status(201).send({
            message:'new user created',
            success:true,
            user
        })
    }
    catch(error){
        console.log(`error has occured - ${error}`);
        return res.status(500).send({
            message:"error 500 occured",
            success:false,
            error
        });
    }
};



exports.loginController= async(req,res)=>{
    try{
       const {email,password} = req.body;
       if(!email || !password){
        return res.status(401).send({
            message:"please provide email or password",
            success:false
       })
      } 
      const user = await userModel.findOne({email})
      if(!user){
        return res.status(200).send({
            message:"email not registered",
            success:false
        })
      }

      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch){
        return res.status(401).send({
            success:false,
            message:"password or email is invalid"
        })
      }
      return res.status(200).send({
        success:true,
        message:"login successful",
        user
      })
    }
      catch(error){
        console.log(`error has occured - ${error}`);
        return res.status(500).send({
            message:"error 500 occured-in login callback",
            success:false,
            error
        });
      } 
};
