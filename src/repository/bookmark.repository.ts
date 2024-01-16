import AppDataSource from '../config/dataSource';
import Bookmark from '../entity/bookmark.entity';
import { BadRequestError } from '../util/customErrors';

const BookmarkRepository = AppDataSource.getRepository(Bookmark).extend({
  //북마크 id찾기
  async getBookmarkById(id: number): Promise<Bookmark> {
    return this.findOne({ where: { id }, relations: { user: true } }).then(
      (bookmark) => {
        if (!bookmark) throw new BadRequestError('북마크가 존재하지 않습니다.');
        return bookmark;
      },
    );
  },
  //List or delete 시 검증을 위해 user의 id를 찾을 때
  async getUserById(userId: number): Promise<Bookmark[]> {
    return this.find({ where: { user: { id: userId } } });
  },
});

export default BookmarkRepository;
