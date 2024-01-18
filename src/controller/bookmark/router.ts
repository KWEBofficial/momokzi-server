import { Router } from 'express';
import {
  deleteBookmark,
  getBookmark,
  getBookmarkFromPlaceId,
  getBookmarkList,
  saveBookmark,
} from './controller';

const bookmarkRouter = Router();

bookmarkRouter.get('/:id', getBookmark);
bookmarkRouter.get('/place', getBookmarkFromPlaceId);
bookmarkRouter.get('/list', getBookmarkList);
bookmarkRouter.post('/', saveBookmark);
bookmarkRouter.delete('/:id', deleteBookmark);

export default bookmarkRouter;
