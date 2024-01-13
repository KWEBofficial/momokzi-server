import AppDataSource from '../config/dataSource';
import History from '../entity/history.entity';
import { BadRequestError } from '../util/customErrors';


const HistoryRepository = AppDataSource.getRepository(History).extend({
  async getHistoryId(id: number): Promise<History> {
    return this.findOne({ where: { id }, relations: { user: true } }).then(
      (history) => {
        if (!history) throw new BadRequestError('히스토리가 존재하지 않습니다.');
        return history;
      },
    );
  },
  
  async getUserId(userId: number): Promise<History[]> {
    return this.find({ where: { user: { id: userId } } });
  },

});

export default HistoryRepository;
