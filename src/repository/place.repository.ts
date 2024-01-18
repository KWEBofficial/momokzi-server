import AppDataSource from '../config/dataSource';
import Place from '../entity/place.entity';

const PlaceRepository = AppDataSource.getRepository(Place).extend({});
  
export default PlaceRepository;