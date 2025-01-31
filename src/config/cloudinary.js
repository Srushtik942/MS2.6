import {v2 as cloudinary} from "cloudinary";
import crypto from 'crypto';

export const cloudinaryConfig = () =>{
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

export const generateSignatre = (paramsToSign)=>{
     const {api_secret} =cloudinary.config();
     const sortedParams = Object.keys(paramsToSign).sort().map((key)=> `${key}=${paramsToSign}`).at
     join('&');

    //creating signature
     const signature = crypto
     .createHash('sha1')
     .update(sortedParams + api_secret)
     .digest('hex'); //digest generate final output in hexadecimal format

return signature;

};

export const uploadToCloudinary = async (filepath) =>{
    try{
        cloudinaryConfig();
        const timestamp = Math.round((new Date()).getTime / 1000);
        const paramsToSign = {
            timestamp,
        };

        const signature = generateSignatre(paramsToSign);
        const result = await cloudinary.uploader.upload(filepath,{
            ...paramsToSign,
            signature,
            api_key: process.env.CLOUDINARY_API_KEY,
        });
        return result;

    }catch(error){
        console.error(error);
    }
};