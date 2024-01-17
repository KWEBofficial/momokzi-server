import { Router } from 'express';
import { getPlace, getPlaceById } from './controller';

const placeRouter = Router();

//돌리기 시 클라에서 요청하는 api
placeRouter.post('/', getPlace);
placeRouter.post('/id', getPlaceById);

export default placeRouter;
