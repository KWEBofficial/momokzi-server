import { Router } from 'express';
import userRouter from './user/router';
import historyRouter from './history/router';
import bookmarkRouter from './bookmark/router';
import authRouter from './auth/router';

const router = Router();

router.use('/user', userRouter);
router.use('/history', historyRouter);
router.use('/bookmark', bookmarkRouter);
router.use('/auth', authRouter);
export default router;
