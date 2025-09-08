import { getCollection } from "../../database/database";
import { Router } from 'express';
import { userRegisterRouter } from "./register";
import { userLoginRouter } from "./auth";
import { getListUser, getOneUser } from "./get";
import { noNeedAuth } from "./middleware";

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