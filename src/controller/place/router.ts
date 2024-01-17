import { Router } from 'express';
import { getPlaceById, getPlace } from './controller';

const placeRouter = Router();

//돌리기 시 클라에서 요청하는 api
placeRouter.post('/db', getPlaceById);
placeRouter.post('/', getPlace);
placeRouter.get('/id', getPlaceById);

export default placeRouter;