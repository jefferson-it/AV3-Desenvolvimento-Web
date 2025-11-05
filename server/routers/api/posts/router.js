
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

postRouter.post('/', isAuth.bind(null, ''), createPost);

postRouter.put('/:id', isAuth.bind(null, ''), editPost);
postRouter.put('/:id/like', isAuth.bind(null, ''), likePost);

postRouter.delete('/:id', isAuth.bind(null, ''), deletePost);

export default postRouter;