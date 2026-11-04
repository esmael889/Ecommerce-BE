export const authorization=(Roles=[])=>{

    return(req,res,next)=>{
try {
    if(!Roles.includes(req.user.role)){
 return res.json({message:"Forbidden Account"})
}
return next();
} catch (error) {
    res.json({message:"Authorization error",error})
}
    }
}