import express from 'express';
import userController from './userController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
const userRouter = express.Router();

//ROUTE LEVEL MIDDLEWARE
userRouter.use('/profile', checkUserAuth)

// PUBLIC ROUTES
userRouter.post('/register', userController.userRegistration)
userRouter.post('/login', userController.userLogin)

//PRIVATE ROUTES
userRouter.get('/profile', userController.userProfile)

export default userRouter
