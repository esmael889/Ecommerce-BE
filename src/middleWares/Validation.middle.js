
export const Validation_middle=(Schema)=>{

    return(req,res,next)=>{
        const data={...req.body,...req.params,...req.query};
        const result=Schema.validate(data,{abortEarly:false});
        const errorMessage=result.error.details.map((x)=>x.message);
        if(result.error){
            return next(new Error(errorMessage))
        }
        // res.json({result});
        
        return next();
    }
}