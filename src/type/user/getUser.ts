export default interface GetUser {
  id?: number;
  username?: string;
  password?: string;
  nickname?: string;
  age?: number;
  gender?: 'M' | 'F';
}
