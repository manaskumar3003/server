const mongoose = require('mongoose')
const { type } = require('os')
const auth = require('../middleware/auth')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    content:{
        type:String,

    },
    imageUrl:{
        type:String,
    },
    authorUrl:{
        type:String,
    },
    author:{
        type:String,
    }

}) 

module.exports = mongoose.model('Blog',blogSchema)