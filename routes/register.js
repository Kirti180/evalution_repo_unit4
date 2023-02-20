const express=require('express')
const regRouter=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {resModel}=require('../models/register')
regRouter.use(express.json())

// REGISTER ROUTER
// regRouter.get('/',async(req,res)=>{
//     const comments=await resModel.find(req.query)
//     res.send({msg:'got comments'})
// })
regRouter.post('/register',async(req,res)=>{
    const{name,email,gender,password,age,city}=req.body
    const user = await resModel.find({ email })
        if(user){
            res.send({msg:'User already exist, please login'})
        }
        else{
    try{
        
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.send({msg:"error"})
                }else{
                    const user=new resModel({name,email,gender,age,city,password:hash})
                    await user.save()
                    res.send({msg:"register successfully"})
                }
            })
        
        
    }catch(err){console.log(err)}
}
})

// LOGIN 

regRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await resModel.find({ email })
        
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "kirti")
                    res.send({ "msg": "login done", "token": token })
                } else {
                    res.send({ data: 'wrong' })
                }
            })

        } else {
            res.send({ data: 'wrong credentials' })
        }
    } catch (err) { console.log(err) }

})
module.exports={regRouter}
