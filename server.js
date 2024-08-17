const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');



dotenv.config();
const app =express();
const PORT = process.env.PORT ||8080;
const userRoutes=require('./routes/userRoutes');
const blogRoutes=require('./routes/blogRoutes');
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



app.use('/api/v1/user',userRoutes);
app.use('/api/v1/blog',blogRoutes);

// app.get("/",(req,res)=>{
//     res.status(200).send({
//         message:"node server",
//     });
// });


app.listen(PORT,(req,res)=>{
    console.log("Port is running")
});
