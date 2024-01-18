import { Router } from 'express';
import {
  deleteHistory,
  getHistory,
  getHistoryFromPlaceId,
  getHistoryList,
  saveHistory,
} from './controller';

const historyRouter = Router();

historyRouter.get('/list', getHistoryList);
historyRouter.get('/place', getHistoryFromPlaceId);
historyRouter.get('/:id', getHistory);
historyRouter.post('/', saveHistory);
historyRouter.delete('/:id', deleteHistory);

export default historyRouter;