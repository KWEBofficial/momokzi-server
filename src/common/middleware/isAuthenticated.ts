import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../util/customErrors';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session.user) {
    next(); // 로그인 상태이면 다음 미들웨어로 이동
  } else {
    next(new UnauthorizedError('로그인이 필요합니다.')); // 로그인 상태가 아니면 에러 처리
  }
};
