import AppDataSource from '../config/dataSource';
import Bookmark from '../entity/bookmark.entity';
import PlaceService from '../service/place.service';
import PlaceRepository from './place.repository';
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
  async getBookmarkByIdWithPlace(bookmarkId: number): Promise<Bookmark> {
    const bookmark = await this.findOne({
      where: { id: bookmarkId },
      relations: { place: true, user: true },
    });

    if (!bookmark) {
      throw new BadRequestError('히스토리가 존재하지 않습니다.');
    }

    return {
      id: bookmark.id,
      place: bookmark.place, // 이 부분이 히스토리에 연결된 장소 정보입니다.
      user: bookmark.user,
    };
  },
  //List or delete 시 검증을 위해 user의 id를 찾을 때
  async getUserById(userId: number): Promise<Bookmark[]> {
    return this.find({ where: { user: { id: userId } } });
  },
  // 해당 음식점이 즐겨찾기 등록되어있는지 확인할 때
  async getPlaceByPlaceId(placeId: number): Promise<number> {
    return PlaceService.getIdByPlaceId(placeId);
  },
  // 해당 음식점이 즐겨찾기 등록되어있는지 확인할 때
  async getBookmarkByPlaceId(
    userId: number,
    placeId: number,
  ): Promise<Bookmark> {
    const placeKey = BookmarkRepository.getPlaceByPlaceId(placeId);
    return this.findOne({
      where: {
        user: { id: userId },
        place: { id: placeId },
      },
    }).then((bookmark) => {
      if (!bookmark) throw new BadRequestError('북마크가 존재하지 않습니다.');
      return bookmark;
    });
  },
});

export default BookmarkRepository;