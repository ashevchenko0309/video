import { Request } from 'express';
import { validationResult, body } from 'express-validator';

import deleteVideoFiles from '../util/delete-video-files';

const videoValidation = [
  body('title').trim().not().isEmpty()
    .withMessage('must not be empty')
    .escape()
    .isLength({ min: 5, max: 120 })
    .withMessage('must be greater than 5 and less than 120 chars'),
  body('description').trim().not().isEmpty()
    .withMessage('must not be empty')
    .isLength({ min: 5, max: 255 })
    .withMessage('must be greater than 5 and less than 255 chars'),
];

export const requestValidationHandler = (req: Request) => (
  // TODO: rewrite this shit...
  new Promise<string[]>((resolve, reject) => {
    let hasErrors = false;
    const result: string[] = [];

    const { files } = req;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      hasErrors = true;
    }

    try {
      if (!Array.isArray(files)) {
        if (files.video && files.thumb) {
          result.push(files.video[0].filename);
          result.push(files.thumb[0].filename);
        } else {
          return deleteVideoFiles(files)
            .then(() => reject({ msg: 'No video file or thumb file exists', code: 422 }))
            .catch((err) => reject({ msg: err, code: 500 }));
        }

        if (hasErrors) {
          return deleteVideoFiles(req.files)
            .then(() => reject({ msg: errors.array(), code: 422 }))
            .catch((err) => reject({ msg: err, code: 500 }));
        }
      } else {
        reject({ msg: 'No files exists', code: 422 });
      }

      return resolve(result);
    } catch (err) {
      reject({ msg: err, code: 500 });
    }
  })
);

export default videoValidation;
