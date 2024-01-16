import AppDataSource from '../config/dataSource';
import History from '../entity/history.entity';
import { BadRequestError } from '../util/customErrors';

const HistoryRepository = AppDataSource.getRepository(History).extend({
  //히스토리 id 찾기
  async getHistoryById(id: number): Promise<History> {
    return this.findOne({ where: { id }, relations: { user: true } }).then(
      (history) => {
        if (!history)
          throw new BadRequestError('히스토리가 존재하지 않습니다.');
        return history;
      },
    );
  },
  //List or delete 시 검증을 위해 user의 id를 찾을 때
  async getUserById(userId: number): Promise<History[]> {
    return this.find({ where: { user: { id: userId } } });
  },

  async getUserHistoryCount(userId: number): Promise<number> {
    return this.count({ where: { user: { id: userId } } });
  },

  async getOldestUserHistory(userId: number): Promise<History | null> {
    return this.findOne({
      where: { user: { id: userId } },
      order: { createdAt: 'ASC' },
    });
  },
});

export default HistoryRepository;
