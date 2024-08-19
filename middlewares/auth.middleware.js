import { User } from "../model/user.model.js";
import { asyncHanldler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHanldler(async(req,res,next)=>{
    try {
        const Token = req.cookies?.Token
    
        if(!Token){
            return res.redirect("/user/login")
        }
    
        const decodedInfo = jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedInfo._id).select("-password")
        if (!user){
            return res.redirect("/user/login") 
        }
        req.user = user
        next()
    } catch (error) {
        console.log("Error while authorizing User"+error);
    }

})