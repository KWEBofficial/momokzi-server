import session from 'express-session';

const SESSION_SECRET = process.env;

declare module "express-session" {
    interface SessionData {
        count: number;
    }
}

const sessionMiddleware = session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
});


export default sessionMiddleware;