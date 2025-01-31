import jwt from "jsonwebtoken";
const {authenticateJWT} = (req, res, next)=>{
    const token = req.header('Authorization')?.split(' ')[1]

    // bearer
    if(!token){
        return res.status(403).json({message: "No token provides, auth denied!"});

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decoded;
            next();

        }catch(error){
        return res.status(401).json({message: "Invalid token."});
        }
    }
};

export default authenticateJWT;