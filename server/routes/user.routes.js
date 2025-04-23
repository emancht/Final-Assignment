import express from 'express';
import { verifyToken } from '../app/middleware/auth.middleware.js';
import { register, login, logout, getCurrentUser } from '../app/controllers/auth.controller.js';

const userRouter = express.Router();

// Auth routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', verifyToken, logout);
userRouter.get('/me', verifyToken, getCurrentUser);

export default userRouter;
