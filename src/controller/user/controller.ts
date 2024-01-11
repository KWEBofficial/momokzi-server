import { RequestHandler } from 'express';
import UserService from '../../service/user.service';
import CreateUserInput from '../../type/user/create.input';
import { BadRequestError } from '../../util/customErrors';
const { generatePassword, verifyPassword } = require('../../util/authentication');

// 예시 controller입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

/*export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.query.id);

    const user = await UserService.getUserById(id);
    if (!user) throw new BadRequestError('해당하는 유저가 없습니다.');

    res.json(user);
  } catch (error) {
    next(error);
  }
};*/

/*export const getUsersByAge: RequestHandler = async (req, res, next) => {
  try {
    const age = Number(req.params.age);

    const users = await UserService.getUsersByAge(age);

    res.json(users);
  } catch (error) {
    next(error);
  }
};*/

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body as CreateUserInput;

    if(!username || !password ) throw new BadRequestError("아이디와 비밀번호 모두 입력하세요");

    const hashedPassword = await generatePassword(password);

    const createUserInput: CreateUserInput = { username, password: hashedPassword };

    const user = await UserService.saveUser(createUserInput);

    res.status(201).json(user.id);
    console.log("회원가입 시도");
  } catch (error) {
    next(error);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if ( !username || !password ) throw new BadRequestError("아이디와 비밀번호 모두 입력하세요");

    const user = await UserService.getUserByUsername(username);
    if(!user) throw new BadRequestError("존재하지 않는 아이디");
    //util/authentication.ts 사용
    const isTrue = await verifyPassword(password, user.password);
    if(!isTrue) throw new BadRequestError("비밀번호가 일치하지 않습니다"); 

    req.session.user = {
      id: user.id,
      username: user.username,
    };
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
}

export const signOut: RequestHandler = async (req, res, next) => {
  try {
    req.session.destroy((err: any) => {
      if (err) throw err;
      else return res.redirect('/');
  });
  } catch (error) {
    next(error);
  }
}