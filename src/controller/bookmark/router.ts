import { Router } from 'express';
import { getHistory } from '../history/controller';
import {
  deleteBookmark,
  getBookmark,
  getBookmarkList,
  saveBookmark,
} from './controller';

const bookmarkRouter = Router();

bookmarkRouter.get('/:id', getBookmark);
bookmarkRouter.get('/', getBookmarkList);
bookmarkRouter.post('/', saveBookmark);
bookmarkRouter.delete('/:id', deleteBookmark);

export default bookmarkRouter;
