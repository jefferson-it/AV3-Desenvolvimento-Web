import { Router } from "express";
import userRouter from "./users/router.js";
import postRouter from "./posts/router.js";
import feedBackRouter from "./feedback/router.js";

const apiRouter = Router();

apiRouter.use((req, res, next) => {
    const contentType = req.get("Content-Type");

    if (!contentType || !contentType.startsWith("application/json")) {
        return res.status(415).json({
            flash: {
                message: "Só pode ser enviada requisição em JSON",
                type: "danger",
            },
        });
    }

    next();
});

apiRouter.use('/user', userRouter);
apiRouter.use('/post', postRouter);
apiRouter.use('/feedback', feedBackRouter);

export default apiRouter;