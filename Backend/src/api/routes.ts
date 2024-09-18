import express from 'express';
import userRouter from "./account/account.router"
import authRouter from "./auth/auth.router"
import categoryRouter from "./category/category.router"
import movementRouter from "./movement/movement.router"

const router = express.Router();

router.use('/category', categoryRouter);
router.use('/users', userRouter);
router.use('/movements', movementRouter)
router.use(authRouter);

export default router;