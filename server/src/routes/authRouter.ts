import express from 'express'
import { authController } from '../controllers/AuthController'
import { jwtAuthenticateMiddleware } from '../middleware/authMiddleware'

// EXPRESS ROUTER
const authRouter = express.Router()

authRouter.post('/login', authController.login)

authRouter.get('/logged-in/check', jwtAuthenticateMiddleware, authController.checkLogin)
authRouter.get('/logout', jwtAuthenticateMiddleware, authController.signOut)

export default authRouter