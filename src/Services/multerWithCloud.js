import multer from "multer"


export const MulterWithCloud=()=>{
    const storage=multer.diskStorage({
        
    });

    const FileUpload=multer({storage})
    return FileUpload;
}