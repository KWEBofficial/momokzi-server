import { BadRequestError, InternalServerError } from '../util/customErrors';
import GetHistory from '../type/history/getHistory';
import HistoryRepository from '../repository/history.repository';
import History from '../entity/history.entity';
import SaveHistory from '../type/history/saveHistory';
import GetHistoryList from '../type/history/getHistoryList';

export default class HistoryService {
  static async getHistory(historyId: number): Promise<GetHistory> {
    return await HistoryRepository.getHistoryId(historyId);
  }
  static async getHistoryList(userId: number): Promise<GetHistoryList> {
    try {
      const historys = await HistoryRepository.getUserId(userId);
      const historyList = historys.map((history) => ({
        id: history.id,
        placeId: history.placeId,
      }));
      return { historyList };
    } catch (error) {
      throw new InternalServerError('히스토리 목록을 불러오는데 실패했습니다.');
    }
  }

  static async saveHistory(createHistory: SaveHistory): Promise<History> {
    try {
      const HistoryEntity = await HistoryRepository.create(createHistory);
      return await HistoryRepository.save(HistoryEntity);
    } catch (error) {
      throw new InternalServerError('히스토리를 저장하는데 실패했습니다.');
    }
  }

  static async deleteHistory(historyId: number, userId: number) {
    try {
      const writerId = (await HistoryRepository.getHistoryId(historyId)).user.id;
      if (writerId !== userId)
        throw new BadRequestError('본인의 히스토리만 삭제할 수 있습니다.');
      return await HistoryRepository.softDelete(historyId);
    } catch (error) {
      throw new InternalServerError('알 수 없는 오류');
    }
  }
}
