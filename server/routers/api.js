import { Router } from "express";
import userRouter from "./api/users/router.js";
import postRouter from "./api/posts/router.js";
import feedBackRouter from "./api/feedback/router.js";

const apiRouter = Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/post', postRouter);
apiRouter.use('/feedback', feedBackRouter);

export default apiRouter;