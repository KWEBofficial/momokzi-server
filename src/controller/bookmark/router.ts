import { Router } from 'express';
import { getBookmark, deleteBookmark, getBookmarkList, saveBookmark, getBookmarkFromPlaceId } from './controller';

const bookmarkRouter = Router();

bookmarkRouter.get('/list', getBookmarkList);
bookmarkRouter.get('/place', getBookmarkFromPlaceId);
bookmarkRouter.get('/:id', getBookmark);
bookmarkRouter.post('/', saveBookmark);
bookmarkRouter.delete('/:id', deleteBookmark);

export default bookmarkRouter;
