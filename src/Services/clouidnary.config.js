import { v2 as cloudinary } from 'cloudinary';


//1- setup configration

cloudinary.config({
    cloud_name:"dmnplfw4h",
    api_key:"598555463554977",
    api_secret:"ax_St3LN8627U3nusVjl7zTCYCw"
})

export default cloudinary;