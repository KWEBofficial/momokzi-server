import Place from '../entity/place.entity';
import PlaceRepository from '../repository/place.repository';
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
}
