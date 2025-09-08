
import { Router } from 'express';
import { isAuth } from "../users/middleware.js";
import { editPost } from "./edit.js";
import { createPost } from "./create.js";
import { deletePost } from './delete.js';
import { likePost } from './toggle-like.js';
import { getListPost, getOnePost } from './get.js';

const postRouter = Router();

// Rotas
postRouter.get('/', getListPost);
postRouter.get('/:id', getOnePost);

postRouter.post('/', isAuth, createPost);

postRouter.put('/:id', isAuth, editPost);
postRouter.put('/:id/like', isAuth, likePost);

postRouter.delete('/:id', isAuth, deletePost);

export default postRouter;