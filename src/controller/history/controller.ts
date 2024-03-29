import { RequestHandler } from 'express';
import { BadRequestError } from '../../util/customErrors';
import GetHistory from '../../type/history/getHistory';
import HistoryService from '../../service/history.service';
import GetHistoryList from '../../type/history/getHistoryList';
import SaveHistory from '../../type/history/saveHistory';
import GetUser from '../../type/user/getUser';
import PlaceService from '../../service/place.service';
import PlaceRes from '../../type/place/placeRes';

declare module 'express-session' {
  export interface SessionData {
    user: GetUser;
  }
}
//클라에서 선택한 히스토리의 id를 params로 보내주면 관련 placeId 보내줌
export const getHistory: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id) throw new BadRequestError('히스토리를 불러올 수 없습니다.');
    const history: GetHistory = await HistoryService.getHistory(id);
    res.status(201).json(history);
  } catch (error) {
    next(error);
  }
};
//히스토리 네비게이션바를 클릭하면 현재 로그인 유저의 id에 저장된 북마크 목록 응답
export const getHistoryList: RequestHandler = async (req, res, next) => {
  try {
    const sessionuser = req.session.user as GetUser;
    // console.log(sessionuser);
    if (!sessionuser)
      throw new BadRequestError('히스토리 목록을 불러올 수 없습니다.');
    const id = Number(sessionuser.id);
    const historyList: GetHistoryList = await HistoryService.getHistoryList(id);
    // console.log(historyList);
    // console.log(historyList.historyList[0]);
    res.status(201).json(historyList);
  } catch (error) {
    next(error);
  }
};
// 돌리기한 후 북마크,히스토리가 저장될 때 불러올 핸들러
export const saveHistory: RequestHandler = async (req, res, next) => {
  try {
    const user = req.session.user;
    const placeId = Number(req.body.id);
    const place = await PlaceService.getPlaceById(placeId);
    // console.log(place, user);
    if (!user || !place) throw new BadRequestError('히스토리 저장 실패');
    
    const createHistory: SaveHistory = { user: user as GetUser, place: place };
    await HistoryService.saveHistory(createHistory);

    //const createHistory: SaveHistory = { user: user as GetUser, id: placeId };
    //await HistoryService.saveHistory(createHistory);

    res.status(200).json(place);
  } catch (error) {
    next(error);
  }
};
//삭제 클릭 시 db에 삭제
export const deleteHistory: RequestHandler = async (req, res, next) => {
  try {
    const historyId = Number(req.params.id); //히스토리 아이디 parameter로 줘야 함
    const userId = Number(req.session.user?.id); // 현재 세션이 있으면 거기서 유저 확인
    if (!userId || !historyId) throw new BadRequestError('유저 정보가 없음.');

    await HistoryService.deleteHistory(historyId, userId); //유저 인증은 service에서 함

    res.send('히스토리가 삭제 되었습니다.');
  } catch (error) {
    next(error);
  }
};

//클라에서 선택한 플레이스의 id를 params로 보내주면 관련 북마크아이디 보내줌
export const getHistoryFromPlaceId: RequestHandler = async (req, res, next) => {
  try {
    const placeid = Number(req.query.placeId);
    const userid = req.session.user?.id;
    console.log(`플레이스 아이디: ${placeid}`);

    if (!placeid || !userid)
      throw new BadRequestError('북마크를 불러올 수 없습니다.');
    const history: GetHistory = await HistoryService.getHistoryByPlaceId(
      userid,
      placeid,
    );
    console.log(`히스토리 아이디: ${history.id}`);
    res.status(201).json(history.id);
  } catch (error) {
    next(error);
  }
};