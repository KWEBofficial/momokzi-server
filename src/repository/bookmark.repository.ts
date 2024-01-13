import AppDataSource from '../config/dataSource';
import Bookmark from '../entity/bookmark.entity';
import { BadRequestError } from '../util/customErrors';

const BookmarkRepository = AppDataSource.getRepository(Bookmark).extend({
  async getBookmarkId(id: number): Promise<Bookmark> {
    return this.findOne({ where: { id }, relations: { user: true } }).then(
      (bookmark) => {
        if (!bookmark) throw new BadRequestError('북마크가 존재하지 않습니다.');
        return bookmark;
      },
    );
  },

  async getUserId(userId: number): Promise<Bookmark[]> {
    return this.find({ where: { user: { id: userId } } });
  },
});

export default BookmarkRepository;
