import { Router, Request, Response } from 'express';
import { NextFunction } from 'connect';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.isLoggedIn) {
    next();
    return;
  }

  res.status(403).json({ error: 'not permitted' });
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  class Boat {
    color: string = 'red';

    get formattedColor(): string {
      return `This boats color is ${this.color}`;
    }

    pilot(): void {
      console.log('swish');
    }
  }

  res.send({ message: 'GET' });
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (
    email &&
    password &&
    email === 'ivanvlora@gmail.com' &&
    password === 'password'
  ) {
    req.session = { isLoggedIn: true };
    return res.json({ success: true, data: { email, password } });
  }
  res.json({ success: false, data: null });
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.json({ message: 'youre logged out!' });
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.json({ message: 'protected route homes!' });
});

export default router;
