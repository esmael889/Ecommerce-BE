
import multer from "multer";
import {nanoid} from "nanoid";
import path from "path";
import fs from "fs";
// const nanoid=customAlphabet("abcde12345678910",5)

export const AllowedExtenstions={
    Images:["image/png","image/jpeg","image/avif"],
    Files:["application/pdf"],
    Video:["video/mp4"]
}
export const multerFunction=(AllowedExtenstionsArr,CustomPath)=>{

   
    const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const FullPath=path.resolve(`Media/${CustomPath}`)
         /// Check Dynamic path
    if(!fs.existsSync(FullPath)){
        
        return fs.mkdirSync(FullPath,{recursive:true});
    }

        
        cb(null,FullPath)
    },

    filename:function(req,file,cb){
        const uinqueFileName=nanoid()+file.originalname
        cb(null,uinqueFileName)
    }




    })


    /// Filtration of file
    const fileFilter=function(req,file,cb){
        if(AllowedExtenstionsArr.includes(file.mimetype)){
            return cb(null,true)
        }
        cb(new Error("Invalid Extenstion"),false)
    }

const fileUpload=multer({fileFilter,storage})

return fileUpload;
}


/**
 * mimeType of images >> image/png  image/jpeg
 *mimeType of Files >> application/pdf  application/docs 
 *mimeType of Video >> video/mp4
 */