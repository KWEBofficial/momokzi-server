import { Router } from 'express';
import { getHistory } from '../history/controller';
import { deleteBookmark, getBookmarkList, saveBookmark } from './controller';


const bookmarkRouter = Router();


bookmarkRouter.get('/:id', getHistory);
bookmarkRouter.get('/', getBookmarkList);
bookmarkRouter.post('/', saveBookmark);
bookmarkRouter.delete('/', deleteBookmark);



export default bookmarkRouter;
