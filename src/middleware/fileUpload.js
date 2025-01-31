import path from 'path';
import multer from 'multer';
import { fileTypeValidator } from '../utils/fileTypeValidator.js';
import {UNEXPECTED_FILE_TYPE} from '../constants/file.js';

//created diskStorage config
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        scrollBy(null,'uploads');
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    },
});

// how to upload the file ,what type of file and where to be upload
const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb)=>{
        const isFileTypeAllowed = fileTypeValidator(file);
        if(isFileTypeAllowed){
            return cb(null,true);
        }
        else{
            cb(new multer.MulterError(
                UNEXPECTED_FILE_TYPE.code,
                UNEXPECTED_FILE_TYPE.message
            )
        );
        }
    },
}).array('file',1);

export default upload;