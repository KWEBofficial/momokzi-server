import { RequestHandler } from 'express';
import { BadRequestError } from '../../util/customErrors';
import GetBookmark from '../../type/bookmark/getBookmark';
import BookmarkService from '../../service/bookmark.service';
import GetBookmarkList from '../../type/bookmark/getBookmarkList';
import SaveBookmark from '../../type/bookmark/saveBookmark';
import GetUser from '../../type/user/getUser';
import PlaceService from '../../service/place.service';

declare module 'express-session' {
  export interface SessionData {
    user: GetUser;
  }
}

//클라에서 선택한 북마크의 id를 params로 보내주면 관련 placeId 보내줌
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
//클라에서 선택한 북마크의 id를 params로 보내주면 관련 placeId 보내줌
export const getBookmarkFromPlaceId: RequestHandler = async (req,res,next) => {
  try {
    const placeid = Number(req.query.placeId);
    const userid = req.session.user?.id;
    console.log(`즐겨찾기-플레이스 아이디: ${placeid}`);

    if (!placeid || !userid)
      throw new BadRequestError('북마크를 불러올 수 없습니다.');
    const bookmark: GetBookmark = await BookmarkService.getBookmarkByPlaceId(
      userid,
      placeid,
    );
    console.log(`즐겨찾기-북마크 아이디: ${placeid}`);

    res.status(201).json(bookmark.id);
  } catch (error) {
    next(error);
  }
};
//북마크 네비게이션바를 클릭하면 현재 로그인 유저의 id에 저장된 북마크 목록 응답
export const getBookmarkList: RequestHandler = async (req, res, next) => {
  try {
    const sessionuser = req.session.user as GetUser;
    if (!sessionuser)
      throw new BadRequestError('북마크 목록을 불러올 수 없습니다.');
    const id = Number(sessionuser.id);
    const bookmarkList: GetBookmarkList = await BookmarkService.getBookmarkList(id);
    res.status(201).json(bookmarkList);
  } catch (error) {
    next(error);
  }
};
// 돌리기한 후 북마크,히스토리가 저장될 때 불러올 핸들러
export const saveBookmark: RequestHandler = async (req, res, next) => {
  try {
    const user = req.session.user;
    const userId = user?.id;
    const placeId = Number(req.body.placeId);
    // console.log(`bookmark controller saveBookmark ${placeId}`);
    if (!userId) throw new BadRequestError('히스토리 저장 실패');
    
    const place = await PlaceService.getPlaceById(placeId);
    console.log(`bookmark controller saveBookmark ${place}`);
    if (!user || !place) throw new BadRequestError('히스토리 저장 실패');

    const createBookmark: SaveBookmark = { user: user as GetUser, place: place };
    await BookmarkService.saveBookmark(createBookmark);
    res.status(201).json(place);
  } catch (error) {
    next(error);
  }
};
//삭제 클릭 시 db에 삭제
export const deleteBookmark: RequestHandler = async (req, res, next) => {
  try {
    const bookmarkId = Number(req.params.id); //북마크 아이디 parameter로 줘야 함
    const userId = Number(req.session.user?.id); // 현재 세션이 있으면 거기서 유저 확인
    if (!userId || !bookmarkId) throw new BadRequestError('유저 정보가 없음.');

    await BookmarkService.deleteBookmark(bookmarkId, userId); //유저 인증은 service에서 함

    res.status(201).send('히스토리가 삭제 되었습니다.');
  } catch (error) {
    next(error);
  }
};
