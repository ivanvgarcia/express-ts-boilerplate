import express, { Request, Response } from 'express';
import auth from './routes/auth';
import cookieSession from 'cookie-session';
import './controllers/AuthController';
import { AppRouter } from './AppRouter';

const app = express();
app.use(express.json());
app.use(cookieSession({ keys: ['hey'] }));
app.use(AppRouter.getInstance());

app.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.isLoggedIn) {
    res.json({ message: 'Logged in!' });
  }
  return res.json({ error: 'Please signin' });
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
