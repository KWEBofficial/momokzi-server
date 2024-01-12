// 예시 type/dto입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

export default interface CreateUserInput {
  username: string;
  password: string;
  nickname: string;
  age: number;
  gender: "M" | "F";
}
