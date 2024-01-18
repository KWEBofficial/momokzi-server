import Bookmark from '../entity/bookmark.entity';
import BookmarkRepository from '../repository/bookmark.repository';
import GetBookmark from '../type/bookmark/getBookmark';
import GetBookmarkList from '../type/bookmark/getBookmarkList';
import SaveBookmark from '../type/bookmark/saveBookmark';
import { BadRequestError, InternalServerError } from '../util/customErrors';

export default class BookmarkService {
  //특정 북마크를 불러 올때 사용
  static async getBookmark(bookmarkId: number): Promise<GetBookmark> {
    return await BookmarkRepository.getBookmarkByIdWithPlace(bookmarkId);
  }

  //유저id, 음식점id 받아서 북마크에 있는지 확인
  static async getBookmarkByPlaceId(
    userId: number,
    placeId: number,
  ): Promise<GetBookmark> {
    return await BookmarkRepository.getBookmarkByPlaceId(userId, placeId);
  }
  
  //북마크 페이지에서 북마크 불러올 때 사용
  static async getBookmarkList(userId: number): Promise<GetBookmarkList> {
    try {
      const bookmarks = await BookmarkRepository.getUserById(userId);
      const bookmarkList = bookmarks.map((bookmark) => ({
        id: bookmark.id,
        placeid: bookmark.place.placeId,
      }));
      return { bookmarkList };
    } catch (error) {
      throw new InternalServerError('북마크 목록을 불러오는데 실패했습니다.');
    }
  }
  //북마크를 저장할 때 사용
  static async saveBookmark(createBookmark: SaveBookmark): Promise<Bookmark> {
    try {
      const BookmarkEntity = await BookmarkRepository.create(createBookmark);
      return await BookmarkRepository.save(BookmarkEntity);
    } catch (error) {
      throw new InternalServerError('북마크를 저장하는데 실패했습니다.');
    }
  }
  //북마크 삭제 시 사용
  static async deleteBookmark(id: number, userId: number) {
    try {
      const writerId = (await BookmarkRepository.getBookmarkById(id)).user.id;
      //북마크가 본인의 북마크인지 검증
      if (writerId !== userId)
        throw new BadRequestError('본인의 북마크만 삭제할 수 있습니다.');
      return await BookmarkRepository.softDelete(id);
    } catch (error) {
      throw new InternalServerError('알 수 없는 오류');
    }
  }
}
