
const Blog = require('../models/BlogModel');

const BlogCtrl = {
    addBlog:async (req,res)=>{
        try{
            const{title,content,author,authorUrl,imageUrl}= req.body
            const newBlog = new Blog ({
                title,content,author,authorUrl,imageUrl
            })

            await newBlog.save()
            res.json(newBlog)

        }catch(err){
            return res.status(500).json({msg:err.message})


        }
    },

    Bloglist:async (req,res)=>{
        try{
            const allblog = await Blog.find({})
            res.json(allblog)

        }catch(err){
            return res.status(500).json({msg:err.message})

        }

    }

}

module.exports = BlogCtrl