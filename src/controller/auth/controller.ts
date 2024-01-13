import { RequestHandler } from 'express';
import UserService from '../../service/user.service';
import CreateUserInput from '../../type/user/create.input';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import GetUser from '../../type/user/getUser';
const {
  generatePassword,
  verifyPassword,
} = require('../../util/authentication');

// 예시 controller입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const { username, password, password2, nickname, age, gender } =
      req.body as CreateUserInput & { password2: string };

    if (!username || !password || !password2 || !nickname || !age || !gender)
      throw new BadRequestError('모든 값을 입력하세요');

    if (username.length > 16) throw new BadRequestError('아이디가 너무 깁니다');
    if (nickname.length > 32) throw new BadRequestError('닉네임이 너무 깁니다');
    if (password !== password2)
      throw new BadRequestError('비밀번호를 확인하세요');

    const sameUsername = await UserService.getUserByUsername(username);
    if (sameUsername) throw new BadRequestError('이미 존재하는 아이디입니다.');

    const hashedPassword = await generatePassword(password);

    const createUserInput: CreateUserInput = {
      username,
      password: hashedPassword,
      nickname,
      age,
      gender,
    };

    const user = await UserService.saveUser(createUserInput);

    res.status(201).json(user.id);
  } catch (error) {
    next(error);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new BadRequestError('아이디와 비밀번호 모두 입력하세요');

    const user = await UserService.getUserByUsername(username);
    if (!user) throw new BadRequestError('존재하지 않는 아이디');
    //util/authentication.ts 사용
    const isTrue = await verifyPassword(password, user.password);
    if (!isTrue) throw new BadRequestError('비밀번호가 일치하지 않습니다');

    req.session.user = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      age: user.age,
      gender: user.gender,
    };
    req.session.save((error) => {
      if (error) console.log(error);
    });

    console.log(req.session.user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const signOut: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.session.user);
    req.session.destroy((err: any) => {
      if (err) throw err;
      else return res.status(200);
    });
  } catch (error) {
    next(error);
  }
};
