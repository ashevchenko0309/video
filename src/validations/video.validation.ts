import { body, check } from 'express-validator';

const videoValidation = [
  body("title").trim().not().isEmpty().withMessage('must not be empty').escape().isLength({ min: 5, max: 120 }).withMessage('must be greater than 5 and less than 120 chars'),
  body("description").trim().not().isEmpty().withMessage('must not be empty').isLength({ min: 5, max: 255 }).withMessage('must be greater than 5 and less than 255 chars'),
]
// validation for files ???

export default videoValidation