import { getCollection } from "../../database/database.js";
import { Router } from 'express';
import { userRegisterRouter } from "./register.js";
import { userLoginRouter } from "./auth.js";
import { getListUser, getOneUser } from "./get.js";
import { noNeedAuth } from "./middleware.js";

const UsersColl = getCollection('users');
const userRouter = Router();

UsersColl.createIndex({ username: 1, email: 1 }, { unique: true })

// Rotas
userRouter.get('/', getListUser);
userRouter.get('/:id', getOneUser);

userRouter.post('/', noNeedAuth, userRegisterRouter);
userRouter.post('/login', noNeedAuth, userLoginRouter);
// userRouter.post('/validate');


export default userRouter;