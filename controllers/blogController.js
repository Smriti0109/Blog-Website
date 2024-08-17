const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')
const mongoose = require('mongoose')

exports.getAllBlogsController= async (req,res)=>{
    try{
        const blogs = await blogModel.find({})
        if(!blogs){
            return res.status(200).send({
                message:"No blogs found",
                success:false
            })
        }
        return res.status(200).send({
            success:true,
            message:'all blog lists',
            BlogCount:blogs.length,
            blogs
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error while getting blogs",
            error
        }) 
    }
}

exports.createBlogController= async(req,res)=>{
    try{
        const{title,description,image,user}=req.body

        if(!title || !description ||!image ||!user){
         return res.status(400).send({
            success:false,
            message:"please provide all fields"
        }) 
        }
        const existingUser= await userModel.findById(user)

        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:"user not found"

            })
        }
        const newBlog = new blogModel({title,description,image,user});
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            newBlog.user = existingUser;
            await newBlog.save({ session });
            await existingUser.blogs.push(newBlog);
            await existingUser.save({ session });
            await session.commitTransaction();
            } catch (error) {
                await session.abortTransaction();
                throw error;
                }
        await newBlog.save();
        return res.status(201).send({
            success:true,
            message:"blog created successfully",
            newBlog
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while creating blogs",
            error
        }) 
    }
}

exports.getBlogByIdController= async (req,res)=>{
    try{
        const {id}=req.params
        const blog=await blogModel.findById(id)

        if(!blog){
            return res.status(404).send({
                success:false,
                message:"blog not found"
                })
        }
        return res.status(200).send({
            success:true,
            message:"blog found",
            blog
        })

    }
    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while getting single blog by id",
            error
        }) 
    }
}

exports.updateBlogController= async(req,res)=>{
    try{
        const{title,description,image}=req.body
        const {id}=req.params

        const blog = await blogModel.findByIdAndUpdate(
            id,
            {...req.body},
            {new:true}
        );
        return res.status(200).send({
            success:true,
            message:"blog updated successfully",
            blog
        });
    }       
    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while updating blogs",
            error
        }) 
    }
}

exports.deleteBlogController=async (req,res)=>{
    try{
    
       const blog= await blogModel.findByIdAndDelete(req.params.id)
       .populate("user");
       await blog.user.blogs.pull(blog);
       await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"blog deleted successfully"
            });
    }
    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while deleting the blog",
            error
        }) 
    }
}


exports.userBlogController=async (req,res)=>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"user not found"
                })
        }
        return res.status(200).send({
            success:true,
            message:"user blogs",
            userBlog
            })
    }
    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error in user blog",
            error
        }) 
    }
}