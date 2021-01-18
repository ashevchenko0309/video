import { body, check } from "express-validator"

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Enter valid email"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 64 })
    .withMessage("Invalid password"),
]

export const userValidation = [
  ...loginValidation,
  body("nickname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Enter nickname")
    .trim()
    .isLength({ min: 5, max: 120 })
    .withMessage("Nickname must be greater than 5 and less than 120 chars")
]