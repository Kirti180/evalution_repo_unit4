const mongoose=require('mongoose')
postSchema=mongoose.Schema({
    title: String,
    body :String,
    device :String,
    no_if_comments :Number
})
postModel=mongoose.model('post',postSchema)
module.exports={postModel}