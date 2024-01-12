import { Router } from 'express';
import { getUserById, userInfo } from './controller';

const userRouter = Router();

userRouter.get('/', getUserById); // query를 사용하여 id에 맞는 user 정보를 가져오는 api ex) GET http://localhost:3000/user?id=1
userRouter.get('/userinfo', userInfo);
//userRouter.get('/:age', getUsersByAge); // param을 사용하여 age에 맞는 user들 정보를 가져오는 api ex) GET http://localhost:3000/user/23

export default userRouter;
