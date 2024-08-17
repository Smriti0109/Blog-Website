const express=require('express');
const { getAllUsers, registorController, loginController } = require('../controllers/userController');

const router=express.Router();

router.get("/all-users",getAllUsers);

router.post("/register",registorController);


router.post("/login",loginController);


module.exports=router;
