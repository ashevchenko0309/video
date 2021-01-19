import { Router } from "express"
import {
  postSingup,
  postLogin,
} from "../../controllers/auth.controller"

import { loginValidation, userValidation } from "../../validations/user.validation"
import validateUserNickname from "../../middleware/validate-user-nickname"
import validateUserEmail from "../../middleware/validate-user-email"
import validationResolver from "../../middleware/validation-resolver"

const router = Router()

router.post("/singup", [...userValidation], validationResolver, validateUserNickname, validateUserEmail, postSingup)
router.post("/login", [...loginValidation], validationResolver, postLogin)

export default router
