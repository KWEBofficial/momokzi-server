import Place from '../entity/place.entity';
import PlaceRepository from '../repository/place.repository';
import PlaceRes from '../type/place/placeRes';
import { InternalServerError } from '../util/customErrors';

// 예시 service입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

export default class PlaceService {
  static async getPlaceById(id: number): Promise<Place> {
    try {
      return await PlaceRepository.getPlaceById(id);
    } catch (error) {
      throw new InternalServerError('음식점 정보를 불러오는데 실패했습니다.');
    }
  }

  static async savePlace(createPlace: PlaceRes): Promise<Place> {
    try {
      const PlaceEntity = await PlaceRepository.create(createPlace);
      return await PlaceRepository.save(PlaceEntity);
    } catch (error) {
      throw new InternalServerError('북마크를 저장하는데 실패했습니다.');
    }
  }
  static async getIdByPlaceId(placeId: number): Promise<number> {
    try {
      return (await PlaceRepository.getIdByPlaceId(placeId)).id;
    } catch (error) {
      throw new InternalServerError('음식점 정보를 불러오는데 실패했습니다.');
    }
  }
}