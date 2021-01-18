import { Router } from "express"
import {
  postSingup,
  postLogin,
} from "../../controllers/auth.controller"

import { loginValidation, userValidation } from "../../validations/user.validation"

const router = Router()

router.post("/singup", [...userValidation], postSingup)
router.post("/login", [...loginValidation], postLogin)

export default router
