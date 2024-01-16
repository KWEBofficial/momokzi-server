import { RequestHandler } from 'express';
import UserService from '../../service/user.service';
import CreateUserInput from '../../type/user/create.input';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import GetUser from '../../type/user/getUser';

import { getUserById } from '../user/controller';
import { generatePassword, verifyPassword } from '../../util/authentication';
declare module 'express-session' {
  export interface SessionData {
    user: GetUser;
  }
}

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
    } as GetUser;

    const userRes = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      age: user.age,
      gender: user.gender,
    } as GetUser;

    req.session.save((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Session saved successfully');
      }
    });
    res.status(201).json(userRes);
  } catch (error) {
    next(error);
  }
};

export const signOut: RequestHandler = async (req, res, next) => {
  try {
    console.log("logout");
    console.log(req.session.user);
    req.session.destroy((err: any) => {
      if (err) {
        next(err);
      } else {
        res.status(201).send('Logged out successfully'); //send추가 해줘야 클라에 응답 보내주기 때문
      }
    });
  } catch (error) {
    next(error);
  }
};
