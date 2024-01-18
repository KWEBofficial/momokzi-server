import PlaceRes from '../place/placeRes';

interface History {
  id?: number;
  place: PlaceRes;
}

export default interface GetHistoryList {
  historyList: Array<History>;
}
