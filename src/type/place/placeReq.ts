export default interface PlaceReq {
  latitude: number;
  longitude: number;
  distanceStd: number;
  reviewCountStd: number;
  opentimeStd: number;
  foodTypeStd: string[];
  starStd: number;
  locationName: string;
}
