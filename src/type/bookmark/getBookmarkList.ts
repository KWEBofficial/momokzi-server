interface Bookmark {
  id?: number;
  placeId: string;
  userId: number;
}

export default interface GetBookmarkList {
  bookmarkList: Array<Bookmark>;
}
