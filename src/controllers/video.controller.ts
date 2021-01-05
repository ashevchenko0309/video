import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import util from 'util';

import { VIDEO_PATH, THUMB_PATH } from '../util/multer';
import Video from '../models/video.model';
import VideoInterface, { VideoRequestParam, VideoRequestQuery } from '../interfaces/video.interface';

const unlink = util.promisify(fs.unlink);

type PaginationOptions = {
  limit: number,
  offset: number
}

const notFoundHandler = (res: Response) => res.status(404).json({ message: 'not found!' });
const serverErrorHandler = (res: Response, error: Error) => res.status(500).json({ error: `Something went wrong: ${error}` });
const validationErrorHandler = (res: Response, errors: ValidationError[] | Error) => {
  if (Array.isArray(errors)) {
    return res.status(422).json({ errors })
  }
  return res.status(422).json({ errors: [errors.toString()] })
};
const incorrectPaginationHandler = (res: Response) => res.status(400).json({ error: 'query must have start and end params' });
const deleteFiles = (files: any) => {
  const _files = [];
  if (files['video']) {
    _files.push(path.join(VIDEO_PATH, files['video'][0]["filename"]))
  }

  if (files['thumb']) {
    _files.push(path.join(THUMB_PATH, files['thumb'][0]["filename"]))
  }

  return Promise.all(_files.map((file => unlink(file))))
}

const requestValidationHandler = (req: Request) => {

  return new Promise<string[]>((resolve, reject) => {
    let hasErrors = false;
    let result: string[] = [];

    const files = req.files;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      hasErrors = true;
    }

    try {
      if (!Array.isArray(files)) {
        if (files['video'] && files["thumb"]) {
          result.push(files['video'][0]["filename"]);
          result.push(files['thumb'][0]["filename"]);
        } else {
          return deleteFiles(files)
            .then(() => reject({ msg: new Error('No video file or thumb file exists'), code: 422 }))
            .catch((err) => reject({ msg: err, code: 500 }))
        }

        if (hasErrors) {
          return deleteFiles(req.files)
            .then(() => reject({ msg: errors.array(), code: 422 }))
            .catch((err) => reject({ msg: err, code: 500 }))
        }

      } else {
        throw new Error('No files exists')
      }

      resolve(result);

    } catch (err) {
      reject({ msg: err, code: 500 });
    }
  })

}

const getPaginationOptions = (start: string, end: string): PaginationOptions | Error => {
  const _start = parseFloat(start);
  const _end = parseFloat(end);
  if (_start < 0 || _end < _start) {
    return new Error('invalid pagi options');
  }
  return {
    limit: _end - _start,
    offset: _start
  };
}

export const getVideos = (req: Request, res: Response) => {
  const { start = '0', end = '0' } = req.query as VideoRequestQuery;
  if (start === '0' && end === '0') {
    return incorrectPaginationHandler(res);
  }

  const pagiOption: PaginationOptions | Error = getPaginationOptions(start, end);

  if (pagiOption instanceof Error) {
    return res.status(422).json({ error: pagiOption })
  }

  Promise
    .all([
      Video.count(),
      Video.findAll({ ...pagiOption })
    ])
    .then(([count, videos]) => res.status(200).json({ videos, total: count }))
    .catch(err => serverErrorHandler(res, err))
}

export const getVideo = (req: Request, res: Response) => {
  const { videoId = 0 } = req.params as VideoRequestParam;
  if (videoId === 0) {
    return notFoundHandler(res)
  }
  Video.findByPk(videoId)
    .then((video: VideoInterface | null) => {
      if (!video) {
        return notFoundHandler(res)
      }
      res.status(200).json({ video })
    })
    .catch(err => serverErrorHandler(res, err))
}

export const postVideo = (req: Request, res: Response) => {

  requestValidationHandler(req)
    .then((filanames: string[]) => {
      const { title, description } = req.body as VideoInterface;

      const [videoFilename, thumbFilename] = filanames;

      Video.create({ title, description, videoFilename, thumbFilename })
        .then((video: VideoInterface) => res.status(201).json({ video }))
        .catch(err => serverErrorHandler(res, err))
    })
    .catch(err => {
      if (err.code === 500) {
        return serverErrorHandler(res, err.msg);
      } else if (err.code === 422) {
        return validationErrorHandler(res, err.msg);
      }
    })
}

export const deleteVideo = (req: Request, res: Response) => {
  const { videoId = 0 } = req.params as VideoRequestParam;
  if (videoId === 0) {
    return notFoundHandler(res)
  }
  Video.destroy({ where: { id: videoId } })
    .then(() => res.status(200).json({ message: 'deleted' }))
    .catch(err => serverErrorHandler(res, err))
}