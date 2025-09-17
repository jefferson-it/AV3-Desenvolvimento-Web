import express from 'express';
import session from 'express-session';
import path from 'path';
import apiRouter from './routers/api.js';
import { fileURLToPath } from 'url';
import { homePage, profileButton } from './routers/pages/home.js';
import postRouter from './routers/pages/posts/router.js';
import { noNeedAuth } from './routers/api/users/middleware.js';
import showHTML from './routers/replace_params.js';
import MongoStore from 'connect-mongo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: 'sessions'
    }),
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    }
}));

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true, limit: '5gb' }))
app.use(express.json({ limit: '5gb' }))

app.use(async (req, res, next) => {
    req.htmlParams = {
        profile: await profileButton(req)
    }

    next()
})


app.get('/', homePage)

app.get('/login', noNeedAuth.bind(null, ''), (req, res) => {
    res.send(showHTML('login.html'))
})

app.get('/registro', noNeedAuth.bind(null, ''), (req, res) => {
    res.send(showHTML('registro.html'))
})

app.use('/api', apiRouter);
app.use('/post', postRouter);

app.listen(port);