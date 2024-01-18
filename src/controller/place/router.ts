import { Router } from 'express';
import { getPlaceByDB, getPlaceById, getPlace } from './controller';

const placeRouter = Router();

//돌리기 시 클라에서 요청하는 api
placeRouter.post('/db', getPlaceByDB);
placeRouter.post('/id', getPlaceById);
placeRouter.post('/', getPlace);

export default placeRouter;