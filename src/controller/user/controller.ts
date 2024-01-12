import { RequestHandler } from 'express';
import UserService from '../../service/user.service';
import CreateUserInput from '../../type/user/create.input';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
const { generatePassword, verifyPassword } = require('../../util/authentication');

declare module 'express-session' {
  export interface SessionData {
    user: { userid: number, username: string, nickname: string, age: number, gender: string };
  }
}
// 예시 controller입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.query.id);

    const user = await UserService.getUserById(id);
    if (!user) throw new BadRequestError('해당하는 유저가 없습니다.');

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const userInfo: RequestHandler = async (req, res, next) => {
  try {
    const sessionuser = req.session.user;
    console.log(req.session.user);

    if(!sessionuser) throw new BadRequestError('');
    const user = await UserService.getUserById(sessionuser.userid);
    
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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
    const { username, password, password2, nickname, age, gender } = req.body as CreateUserInput & { password2: string };

    if( !username || !password || !password2 || !nickname || !age || !gender ) throw new BadRequestError("모든 값을 입력하세요");

    if( username.length > 16 ) throw new BadRequestError("아이디가 너무 깁니다");
    if( nickname.length > 32 ) throw new BadRequestError("닉네임이 너무 깁니다");
    if( password !== password2 ) throw new BadRequestError("비밀번호를 확인하세요");
    
    const sameUsername = await UserService.getUserByUsername(username);
    if(sameUsername) throw new BadRequestError("이미 존재하는 아이디입니다.");

    const hashedPassword = await generatePassword(password);

    const createUserInput: CreateUserInput = { username, password: hashedPassword, nickname, age, gender };

    const user = await UserService.saveUser(createUserInput);

    res.status(201).json(user.id);
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
      userid: user.id,
      username: user.username,
      nickname: user.nickname,
      age: user.age,
      gender: user.gender,
    };
    req.session.save(error => {if(error) console.log(error)});

    console.log(req.session.user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

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
}