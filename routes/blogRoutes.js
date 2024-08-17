const express=require('express');
const {getAllBlogsController,createBlogController,getBlogByIdController,updateBlogController,deleteBlogController, userBlogController} = require('../controllers/blogController');

const router = express.Router()

router.get('/all-blogs',getAllBlogsController)


router.post('/create-blog',createBlogController)


router.get('/get-blog/:id',getBlogByIdController)


router.put('/update-blog/:id',updateBlogController)


router.delete('/delete-blog/:id',deleteBlogController)


router.get('/user-blog/:id',userBlogController);
module.exports=router;