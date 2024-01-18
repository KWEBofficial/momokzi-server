import Place from '../../entity/place.entity';

interface Bookmark {
  id?: number;
  place: Place;
}

export default interface GetBookmarkList {
  bookmarkList: Array<Bookmark>;
}
