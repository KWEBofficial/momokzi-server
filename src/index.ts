import cors from 'cors';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import AppDataSource from './config/dataSource';
import './config/env';
import router from './controller/router';
import errorHandler from './util/errorHandler';
import { isAuthenticated } from './common/middleware/isAuthenticated';

const Memorystore = require('memorystore')(session)

const PORT = Number(process.env.PORT) || 3000;

const app = express();

const maxAge = 60 * 1000;

const SESSION_SECRET = String(process.env);

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new Memorystore({ checkPeriod: maxAge}),
    cookie: { maxAge: maxAge }
}));

AppDataSource.initialize().then(() => console.log('DATABASE is connected!'));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // cookie를 전달하고 싶을 때는 credential을 true로 해줘야 함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: maxAge }),
    cookie: {
      //sameSite: 'none', //쿠키 정책으로 sameSite가 Lax가 기본인데 none으로 하면 secure 안하면 쿠키전송 불가로 session을 받아올 수가 없어서 테스트 필요
      maxAge: maxAge,
      //secure: true, // 내정보 안되면 samsite, secure 지우기
    },
  }),
);
app.use(['/user', '/history', '/bookmark'], isAuthenticated);
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is started!`));
