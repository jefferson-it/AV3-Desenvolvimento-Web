
import { Router } from 'express';
import { isAuth } from "../users/middleware";
import { editPost } from "./edit";
import { createPost } from "./create";
import { deletePost } from './delete';
import { likePost } from './toggle-like';
import { getListPost, getOnePost } from './get';

const postRouter = Router();

// Rotas
postRouter.get('/', getListPost);
postRouter.get('/:id', getOnePost);

postRouter.post('/', isAuth, createPost);

postRouter.put('/:id', isAuth, editPost);
postRouter.put('/:id/like', isAuth, likePost);

postRouter.delete('/:id', isAuth, deletePost);

export default postRouter;