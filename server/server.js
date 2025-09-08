import express from 'express';
import session from 'express-session';
import path from 'path';
import apiRouter from './routers/api';

const app = express();
const port = 3000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }
}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true, limit: '5gb' }))
app.use(express.json({ limit: '5gb' }))

app.use('/api', apiRouter);

app.listen(port);