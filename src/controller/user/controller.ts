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

    //console.log(sessionStorage.userid);
    const id = req.query.id;
    console.log(id);
    console.log(`Session in userinfo: ${req.session.user?.id}`);
    const user = await UserService.getUserById(Number(id));

    //res.json(user);
    //console.log(req.session.user);
    //const sessionuser = req.session.user as GetUser;
    //console.log(req.session.user);

    //if (!sessionuser) throw new BadRequestError('');
    //const user = await UserService.getUserById(Number(sessionuser.id));

    //res.status(200).json(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

    res.status(200).json(userRes);
  } catch (error) {
    next(error);
  }
};
