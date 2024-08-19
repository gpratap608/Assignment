import {Router} from 'express'
import { registerUser, registerUserShow,loginUser,loginUserShow,userDashboard,logoutUser } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { verifyToken } from '../middlewares/token.middleware.js'

const router = Router()

router.route('/signup').post(registerUser)
router.route('/signup').get(verifyToken,registerUserShow)
router.route('/login').post(loginUser)
router.route('/login').get(verifyToken,loginUserShow)

//Secure Routes

router.route('/').get(verifyJWT,userDashboard)
router.route('/logout').get(verifyJWT,logoutUser)

export default router