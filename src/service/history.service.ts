import { BadRequestError, InternalServerError } from '../util/customErrors';
import GetHistory from '../type/history/getHistory';
import HistoryRepository from '../repository/history.repository';
import History from '../entity/history.entity';
import SaveHistory from '../type/history/saveHistory';
import GetHistoryList from '../type/history/getHistoryList';

export default class HistoryService {
  //특정 히스토리 요청시 사용 ex) 히스토리 목록에서 한 히스토리 클릭 시
  static async getHistory(historyId: number): Promise<GetHistory> {
    return await HistoryRepository.getHistoryById(historyId);
  }
  //히스토리 페이지에서 히스토리 목록을 불러올때 사용
  static async getHistoryList(userId: number): Promise<GetHistoryList> {
    try {
      const historys = await HistoryRepository.getUserById(userId);
      const historyList = historys.map((history) => ({
        id: history.id,
        placeId: history.placeId,
        userId: userId,
      }));
      return { historyList };
    } catch (error) {
      throw new InternalServerError('히스토리 목록을 불러오는데 실패했습니다.');
    }
  }
  //히스토리 저장 시 사용
  static async saveHistory(createHistory: SaveHistory): Promise<History> {
    try {
      const userId = Number(createHistory.user.id);
      // 특정 유저의 히스토리 개수 확인
      const userHistoryCount =
        await HistoryRepository.getUserHistoryCount(userId);
      // 히스토리 개수가 maxHistoryCount를 초과하는 경우 가장 오래된 히스토리 삭제
      const maxHistoryCount = 20;
      if (userHistoryCount > maxHistoryCount) {
        const oldestHistory =
          await HistoryRepository.getOldestUserHistory(userId);

        if (oldestHistory !== null) {
          await HistoryRepository.softDelete(oldestHistory.id);
        }
      }
      // 새로운 히스토리 추가
      const HistoryEntity = await HistoryRepository.create(createHistory);
      return await HistoryRepository.save(HistoryEntity);
    } catch (error) {
      throw new InternalServerError('히스토리를 저장하는데 실패했습니다.');
    }
  }
  //히스토리 삭제 시 사용
  static async deleteHistory(historyId: number, userId: number) {
    try {
      const writerId = (await HistoryRepository.getHistoryById(historyId)).user
        .id;
      //히스토리 검증 시 사용
      if (writerId !== userId)
        throw new BadRequestError('본인의 히스토리만 삭제할 수 있습니다.');
      return await HistoryRepository.softDelete(historyId);
    } catch (error) {
      throw new InternalServerError('알 수 없는 오류');
    }
  }
}
