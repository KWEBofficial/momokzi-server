import AppDataSource from '../config/dataSource';
import Place from '../entity/place.entity';
import { BadRequestError } from '../util/customErrors';

const PlaceRepository = AppDataSource.getRepository(Place).extend({
  //음식점 id찾기
  async getPlaceById(id: number): Promise<Place> {
    return this.findOne({ where: { id } }).then((place) => {
      if (!place) throw new BadRequestError('북마크가 존재하지 않습니다.');
      return place;
    });
  },
  async getIdByPlaceId(placeId: number): Promise<Place> {
    return this.findOne({ where: { placeId } }).then((place) => {
      if (!place) throw new BadRequestError('북마크가 존재하지 않습니다.');
      return place;
    });
  },
});

export default PlaceRepository;
