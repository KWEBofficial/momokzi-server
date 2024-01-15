import cors from 'cors';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import AppDataSource from './config/dataSource';
import './config/env';
import router from './controller/router';
import errorHandler from './util/errorHandler';
import { isAuthenticated } from './common/middleware/isAuthenticated';

const PORT = Number(process.env.PORT) || 3000;

const app = express();

const SESSION_SECRET = String(process.env);
const MemoryStore = require('memorystore')(session);
const maxAge = 24 * 60 * 60 * 1000;
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
      maxAge: maxAge,
    },
  }),
);
app.use(['/user', '/history', '/bookmark'], isAuthenticated);
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is started!`));
