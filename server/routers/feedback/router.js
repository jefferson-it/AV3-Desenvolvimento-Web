
import { Router } from 'express';
import { isAuth } from "../users/middleware";
import { newFeedBack } from './create';
import { deleteFeedback } from './delete';
import { getFeedBackInPost, getFeedBackOne } from './get';

const feedBack = Router();

// Rotas
feedBack.get('/:postId', getFeedBackInPost);
feedBack.get('/:id', getFeedBackOne);

feedBack.post('/:postId', isAuth, newFeedBack);

feedBack.delete('/:id', isAuth, deleteFeedback);

export default feedBack;