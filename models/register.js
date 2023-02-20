const mongoose=require('mongoose')
registerSchema=mongoose.Schema({
    name: String,
email :String,
gender :String,
password :String,
age :Number,
city :String
})
resModel=mongoose.model('register',registerSchema)
module.exports={resModel}