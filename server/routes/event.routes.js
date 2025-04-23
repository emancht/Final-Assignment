import express from 'express';
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getEventsByCategory,
  getEventsByKeyword,
  updateEvent,
} from '../app/controllers/event.controller.js';
import { verifyToken } from '../app/middleware/auth.middleware.js';

const eventRouter = express.Router();

// Public routes
eventRouter.get('/', getAllEvents);
eventRouter.get('/:id', getEventById);
eventRouter.get('/category/:category', getEventsByCategory);
eventRouter.get('/keyword/:keyword', getEventsByKeyword);

// Protected routes (require login)
eventRouter.post('/', verifyToken, createEvent);
eventRouter.put('/:id', verifyToken, updateEvent);
eventRouter.delete('/:id', verifyToken, deleteEvent);

export default eventRouter;
