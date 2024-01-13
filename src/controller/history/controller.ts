import { RequestHandler } from 'express';
import { BadRequestError } from '../../util/customErrors';
import GetHistory from '../../type/history/getHistory';
import HistoryService from '../../service/history.service';
import GetHistoryList from '../../type/history/getHistoryList';
import SaveHistory from '../../type/history/saveHistory';
import GetUser from '../../type/user/getUser';
declare module 'express-session' {
  export interface SessionData {
    user: GetUser;
  }
}

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

export const getHistoryList: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.session.user?.id);
    if (!id) throw new BadRequestError('히스토리 목록을 불러올 수 없습니다.');
    const historyList: GetHistoryList = await HistoryService.getHistoryList(id);
    res.status(201).json(historyList);
  } catch (error) {
    next(error);
  }
};

export const saveHistory: RequestHandler = async (req, res, next) => {
  try {
    const user = req.session.user;
    const { placeId } = req.body;
    if (!user || !placeId) throw new BadRequestError('히스토리 저장 실패');

    const createHistory: SaveHistory = { user: user as GetUser, placeId };
    await HistoryService.saveHistory(createHistory);

    res.status(201).send('히스토리가 저장 되었습니다.');
  } catch (error) {
    next(error);
  }
};

export const deleteHistory: RequestHandler = async (req, res, next) => {
  try {
    const historyId = Number(req.params.id);
    const userId = Number(req.session.user?.id);
    if (!userId || !historyId) throw new BadRequestError('유저 정보가 없음.');

    await HistoryService.deleteHistory(historyId, userId);

    res.send('히스토리가 삭제 되었습니다.');
  } catch (error) {
    next(error);
  }
};
