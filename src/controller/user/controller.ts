import { RequestHandler } from 'express';
import UserService from '../../service/user.service';
import { BadRequestError } from '../../util/customErrors';
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

    const sessionuser = req.session.user;
    if(!sessionuser) throw new BadRequestError("please login");
    const user = await UserService.getUserById(Number(sessionuser.id));

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
