import { RequestHandler } from 'express';
import { BadRequestError } from '../../util/customErrors';
import GetBookmark from '../../type/bookmark/getBookmark';
import BookmarkService from '../../service/bookmark.service';
import GetBookmarkList from '../../type/bookmark/getBookmarkList';
import SaveBookmark from '../../type/bookmark/saveBookmark';

export const getBookmark: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new BadRequestError('북마크를 불러올 수 없습니다.');
    const bookmark: GetBookmark = await BookmarkService.getBookmark(id);
    res.status(201).json(bookmark);
  } catch (error) {
    next(error);
  }
};

export const getBookmarkList: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.session.id);
    if (!id) throw new BadRequestError('히스토리 목록을 불러올 수 없습니다.');
    const bookmarkList: GetBookmarkList = await BookmarkService.getBookmarkList(id);
    res.status(201).json(bookmarkList);
  } catch (error) {
    next(error);
  }
};

export const saveBookmark: RequestHandler = async (req, res, next) => {
  try {
    const user = req.session;
    const { placeId } = req.body;
    if (!user || !placeId) throw new BadRequestError('히스토리 저장 실패');

    const createBookmark: SaveBookmark = { user, placeId };
    await BookmarkService.saveBookmark(createBookmark);
    res.status(201).send('히스토리가 저장 되었습니다.');
  } catch (error) {
    next(error);
  }
};

export const deleteBookmark: RequestHandler = async (req, res, next) => {
  try {
    const bookmarkId = Number(req.params.id);
    const userId = Number(req.session.id);

    await BookmarkService.deleteBookmark(bookmarkId, userId);

    res.status(201).send('히스토리가 삭제 되었습니다.');
  } catch (error) {
    next(error);
  }
};
