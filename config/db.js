const mongoose=require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connection established !! ')
    }
    catch(error){
        console.log(`your error is ${error}`);
    }
}

module.exports=connectDB;