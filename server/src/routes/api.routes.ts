import { Router } from "express"
import videoRoutes from "./video/video.routes"
import categoryRoutes from "./categories/category.routes"
import userRoutes from "./user/user.routes"
import authRoutes from "./auth/auth.routes"

const router = Router()

router.use("/videos", videoRoutes)
router.use("/categories", categoryRoutes)
router.use("/user", userRoutes)
router.use("/auth", authRoutes)

export default router
