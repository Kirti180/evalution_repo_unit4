const express=require('express')
const { connection } = require('./db')
const  cors=require('cors')
const{regRouter}=require('./routes/register')
const {postRouter}=require('./routes/post')
// const{auth}=require('./middleware/authatication')
const app=express()
app.use(express.json())
app.use(cors())
app.use('/user',regRouter)
// app.use(auth)
app.use('/post',postRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log('connected to db')
    }catch(err){
        console.log(err)
    }
})