import { Request } from 'express';
import { validationResult, body, ValidationError } from 'express-validator';

import deleteVideoFiles from '../util/delete-video-files';

type FilePathsResponse = [string, string] | []

const videoValidation = [
  body('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('title must not be empty')
    .trim()
    .isLength({ min: 5, max: 120 })
    .withMessage('must be greater than 5 and less than 120 chars'),
  body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('must not be empty')
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('description must be greater than 5 and less than 255 chars'),
  body('categoryId')
    .optional()
    .not()
    .isEmpty()
    .withMessage('categoryId must not be empty')
    .isInt()
    .withMessage('categoryId must be number'),
  body('categoryName')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('categoryName must not be empty')
    .trim()
    .isLength({ min: 5, max: 120 })
    .withMessage('categoryName must be greater than 5 and less than 120 chars'),
];

export const hasRequestError = async (req: Request): Promise<ValidationError[]> => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    await deleteVideoFiles(req.files)
    return errors.array()
  }

  return []
}

export const hasRequestFilesError = async (req: Request): Promise<FilePathsResponse> => {
  const { files } = req

  if (Array.isArray(files)) {
    return []
  }

  if (!(files.video && files.thumb)) {
    await deleteVideoFiles(files)
    return []
  }

  return [files.video[0].filename, files.thumb[0].filename]
}

export default videoValidation;
