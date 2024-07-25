import express from 'express';
import mongoose from 'mongoose';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(express.json());
const allowedOrigins = [
  'https://669f9c606baeea1c42bf7065--legendary-peony-d3886e.netlify.app',
  'https://legendary-peony-d3886e.netlify.app',
  'http://localhost:3000'
];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

mongoose.connect('mongodb+srv://ivan:ivanIvanyk987@cluster0.urmz3co.mongodb.net/your-database-name?retryWrites=true&w=majority', {});

app.post('/auth/login', UserController.login);
app.post('/auth/register', UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});