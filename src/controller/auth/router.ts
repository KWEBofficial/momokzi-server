import { Router } from 'express';
import { signIn, signUp, signOut } from './controller';

const authRouter = Router();

authRouter.post('/sign_in', signIn);
authRouter.post('/sign_up', signUp); // body를 사용하여 user 정보를 저장하는 api ex) POST http://localhost:3000/user | body: { "firstName": "John", "lastName": "Doe", "age": 23 }
authRouter.get('/sign_out', signOut);

export default authRouter;
