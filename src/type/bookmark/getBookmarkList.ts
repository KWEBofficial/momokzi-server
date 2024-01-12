interface Bookmark {
  id?: number;
  placeId: string;
}

export default interface GetBookmarkList {
  bookmarkList: Array<Bookmark>;
}
