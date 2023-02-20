const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,'kirti',(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send({msg:"please login"})
            }
        })
    }else{
        res.send({msg:'please login'})
    }
}
module.exports={auth}