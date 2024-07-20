const BlogCtrl = require('../controller/blogCtrl');
const gptCtrl = require('../controller/gpt');

const router = require('express').Router()


router.post('/addblog',BlogCtrl.addBlog);
router.get('/bloglist',BlogCtrl.Bloglist)
router.post('/gpt',gptCtrl.gptrun)


module.exports= router;