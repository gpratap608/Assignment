import { asyncHanldler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";

const generateUserAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()

        return accessToken
    } catch (error) {
        console.log("Error while Generating Access Token"+error);
        
    }
}

const registerUser = asyncHanldler(async (req,res)=>{
    const fullName = req.body.fName
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword 
    
    if(
        [fullName,email,userName,password,confirmPassword].some((field)=> field?.trim() === "")
    ){
        return res.render("signup",{
            Error:"All Fields Required"
        })
    }

    if(password !== confirmPassword){
        return res.render("signup",{
            Error:"Password not Matched"
        })
    }

    const existingUser = await User.findOne({
        $or:[{userName},{email}]
    })

    if(existingUser){
        return res.render("signup",{
            Error:"User Already Exists with similar Username or Email"
        })
    }

    const user = await  User.create({
        fullName:fullName,
        userName:userName,
        email:email,
        password:password

    })
    const userCreated = await User.findById(user._id).select(
        "-password"
    )
    const accessToken = await generateUserAccessToken(userCreated._id)
    const options = {
        httpOnly:true,
        secure:true
    }

    

    return res
    .cookie("Token",accessToken,options)
    .redirect("/")
    
})


const registerUserShow = asyncHanldler(async (req,res)=>{
    return res.render("signup",{
        Error:""
    })
})


const loginUser = asyncHanldler(async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const userName = req.body.userName

    if(!(email || userName)){
        return res.render("login",{
            Error:"Please Provide Email or UserName"
        })
    }
    const user = await User.findOne({
        $or:[{userName},{email}]
    })
    if(!user){
        return res.render("login",{
            Error:"User doesn't Exist"
        })
    }

    const isPasswordValid =await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        return res.render("login",{
            Error:"Incorrect Password"
        })
    }

    const accessToken = await generateUserAccessToken(user._id)
    const options = {
        httpOnly:true,
        secure:true
    }

    

    return res
    .cookie("Token",accessToken,options)
    .redirect("/")

})

const loginUserShow = asyncHanldler(async(req,res)=>{
    return res.render("login",{
        Error:""
    })
})

const userDashboard = asyncHanldler(async (req,res)=>{
    const user = req.user 
    return res.render("index",{
        fName:user.fullName,
        userName:user.userName,
        email:user.email
    })
    
})

const logoutUser = asyncHanldler(async (req,res)=>{
    return res 
    .clearCookie("Token")
    .redirect("/user/login")
})

export {
    registerUser,
    registerUserShow,
    loginUser,
    loginUserShow,
    userDashboard,
    logoutUser
}