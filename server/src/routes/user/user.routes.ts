import { Router } from "express"
import { postDeleteUser } from "../../controllers/user.controller"

const router = Router()

router.delete("/:userId", postDeleteUser)

export default router
