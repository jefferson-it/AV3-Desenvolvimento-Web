
import { Router } from 'express';
import { isAuth } from "../users/middleware.js";
import { newFeedBack } from './create.js';
import { deleteFeedback } from './delete.js';
import { getFeedBackInPost, getFeedBackOne } from './get.js';

const feedBackRouter = Router();

// Rotas
feedBackRouter.get('/:postId', getFeedBackInPost);
feedBackRouter.get('/:id', getFeedBackOne);

feedBackRouter.post('/:postId', isAuth, newFeedBack);

feedBackRouter.delete('/:id', isAuth, deleteFeedback);

export default feedBackRouter;