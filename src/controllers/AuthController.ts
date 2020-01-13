import { Request, Response } from 'express';
import { get, controller } from './decorators';

@controller('/auth')
class AuthController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.status(200).json({ message: 'GET' });
  }
}
