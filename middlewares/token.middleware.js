import { asyncHanldler } from "../utils/asyncHandler.js";


export const verifyToken = asyncHanldler(async(req,res,next)=>{
    try {
        const Token = req.cookies?.Token
    
        if(Token){
            return res.redirect("/user")
        }

        next()
    } catch (error) {
        console.log("Error while authorizing Token"+error);
    }

})