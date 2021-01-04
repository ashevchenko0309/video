import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';

import Video from '../models/video.model';
import VideoInterface, { VideoRequestParam, VideoRequestQuery } from '../interfaces/video.interface';

type PaginationOptions = {
  limit: number,
  offset: number
}

const notFoundHandler = (res: Response) => res.status(404).json({ message: 'not found!' });
const serverErrorHandler = (res: Response, error: Error) => res.status(500).json({ error: `Something went wrong: ${error}` });
const validationErrorHandler = (res: Response, errors: ValidationError[]) => res.status(422).json({ errors });
const incorrectPaginationHandler = (res: Response) => res.status(400).json({ error: 'query must have start and end params' });

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorHandler(res, errors.array())
  }

  const { title, description } = req.body as VideoInterface;
  Video.create({ title, description })
    .then((video: VideoInterface) => res.status(201).json({ video }))
    .catch(err => serverErrorHandler(res, err))
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