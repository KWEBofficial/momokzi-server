import cors from 'cors';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import AppDataSource from './config/dataSource';
import './config/env';
import router from './controller/router';
import errorHandler from './util/errorHandler';

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
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is started!`));