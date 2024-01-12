import { Router } from 'express';
import userRouter from './user/router';
import historyRouter from './history/router';
import bookmarkRouter from './bookmark/router';

const router = Router();

router.use('/user', userRouter);
router.use('/history', historyRouter);
router.use('/bookmark', bookmarkRouter);


export default router;
