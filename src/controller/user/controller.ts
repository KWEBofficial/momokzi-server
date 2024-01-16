import { RequestHandler } from 'express';
import UserService from '../../service/user.service';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';
import GetUser from '../../type/user/getUser';

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
    const sessionuser = req.session.user as GetUser;
    console.log(req.session.user);

    const user = await UserService.getUserById(Number(sessionuser.id));
    if (!sessionuser || !user) throw new BadRequestError('');

    const userRes = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      age: user.age,
      gender: user.gender,
    } as GetUser;

    res.status(200).json(userRes);
  } catch (error) {
    next(error);
  }
};
