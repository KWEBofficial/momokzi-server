interface History {
  id?: number;
  placeId: string;
}

export default interface GetHistoryList {
  historyList: Array<History>;
}
