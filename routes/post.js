const express=require('express')
const postRouter=express.Router()
const{postModel}=require("../models/post")
const{auth}=require('../middleware/authatication')
postRouter.use(express.json())

postRouter.get('/',auth,async(req,res)=>{
    const comments=await postModel.find(req.query)
    res.send({msg:'got comments',data:comments})
})

postRouter.post('/create',async(req,res)=>{
   
    const payload=req.body
    try{
        const comments=new postModel(payload)
        await comments.save()
        res.send({msg:"created"})
    }catch(err){
        console.log(err)
    }
    res.send({msg:'got comments',data:comments})
})

postRouter.get('/top',auth,async(req,res)=>{
    const comments=await postModel.find({$max:"no_if_comments"})
    res.send({msg:'got comments',data:comments})
})

postRouter.patch('/update/:id',auth,async(req,res)=>{
    const payload=req.body
    const Id= req.params.id
    try{
        const comment= await postModel.findByIdAndUpdate({_id:Id},payload)
        res.send({msg:"patch req"})
    }catch(err){
        console.log(err)
    }
})
postRouter.delete('/delete/:id',auth,async(req,res)=>{
    // const payload=req.body
    const Id= req.params.id
    try{
        const comment= await postModel.findByIdAndDelete({_id:Id})
        res.send({msg:"delete req"})
    }catch(err){
        console.log(err)
    }
})
module.exports={postRouter}