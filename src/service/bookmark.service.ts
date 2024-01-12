import Bookmark from '../entity/bookmark.entity';
import BookmarkRepository from '../repository/bookmark.repository';
import GetBookmark from '../type/bookmark/getBookmark';
import GetBookmarkList from '../type/bookmark/getBookmarkList';
import SaveBookmark from '../type/bookmark/saveBookmark';
import { BadRequestError, InternalServerError } from '../util/customErrors';

export default class BookmarkService {
  static async getBookmark(bookmarkId: number): Promise<GetBookmark> {
    return await BookmarkRepository.getBookmarkId(bookmarkId);
  }
  static async getBookmarkList(userId: number): Promise<GetBookmarkList> {
    try {
      const bookmarks = await BookmarkRepository.getUserId(userId);
      const bookmarkList = bookmarks.map((bookmark) => ({
        id: bookmark.id,
        placeId: bookmark.placeId,
      }));
      return { bookmarkList };
    } catch (error) {
      throw new InternalServerError('북마크 목록을 불러오는데 실패했습니다.');
    }
  }

  static async saveBookmark(createBookmark: SaveBookmark): Promise<Bookmark> {
    try {
      const BookmarkEntity = await BookmarkRepository.create(createBookmark);
      return await BookmarkRepository.save(BookmarkEntity);
    } catch (error) {
      throw new InternalServerError('북마크를 저장하는데 실패했습니다.');
    }
  }

  static async deleteBookmark(id: number, userId: number) {
    try {
      const writerId = (await BookmarkRepository.getBookmarkId(id)).user.id;
      if (writerId !== userId)
        throw new BadRequestError('본인의 북마크만 삭제할 수 있습니다.');
      return await BookmarkRepository.softDelete(id);
    } catch (error) {
      throw new InternalServerError('알 수 없는 오류');
    }
  }
}
