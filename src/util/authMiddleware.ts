import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {
  const key = process.env.SECRET_KEY;
  // 인증 완료
  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
    req.decoded = jwt.verify(req.headers.authorization, key);
    return next();
  } catch (error) {
    // 인증 실패
    // 유효시간이 초과된 경우
    return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
    });
  }
};