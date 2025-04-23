import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import sanitizer from 'express-mongo-sanitize';
import limiter from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import eventRouter from './routes/event.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();
dotenv.config();

//! middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(sanitizer());
app.use(cookieParser());
app.use(
  limiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());
app.use(hpp());

//! test route
app.get('/', (req, res) => res.send('Server is running!'));
//! routes
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);

//! connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('mongoDB connection failed', error);
  });

//! start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
