import { Router } from 'express';
import { getPlaceByDB, getPlaceByPlaceId, getPlaceById, getPlace } from './controller';

const placeRouter = Router();

//돌리기 시 클라에서 요청하는 api
placeRouter.post('/db', getPlaceByDB);
placeRouter.post('/place/id', getPlaceByPlaceId);
placeRouter.post('/id', getPlaceById);
placeRouter.post('/', getPlace);

export default placeRouter;