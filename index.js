import express from 'express';
import { fileRouter } from './src/router/fileRouter.js';
import {fileURLToPath} from 'url';
import fs from 'fs';
import path from 'path';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);

const uploadDir = path.join(__dirname,'upload');

//if uploadDir is not exist
if(!fs.existsSync(uploadDir)){
   fs.mkdirSync(uploadDir);
}

//route for server static images

app.use('/src/uploads',express.static("src/uploads"));

app.use('/files',fileRouter);

app.use('/',(req,res)=>{
    res.send("Welcome to file/image upload");
})


const PORT = process.env.PORT || 4040;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});