const jwt = require('jsonwebtoken');
const JWT_SECRET ='Dhruvisclassy';

const fetchuser = (req,res,next)=>{
    //get the user from the jwt token and add id to req object.
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authneticate a valid User"})
    }
    try { 
        const data = jwt.verify(token, JWT_SECRET);
        console.log(token);
        console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please Authneticate a valid User"}); 
    }
}
module.exports = fetchuser;