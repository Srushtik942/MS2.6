import { request } from "express";

const isFilePresent = (req,res,next)=>{
    if(!request.files){
        return res
        .status(400)
        .json({description: "File not present in request body."});
    }
    if(Array.isArray(req.files)&& req.files.length === 0){
        return res.status(400).json({error:{description:'No file uploaded'}});
    }
    next();
};

export default isFilePresent;