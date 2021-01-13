import { Request, Response } from 'express';

import errorResponseMaster from '../util/error-responses';

import Video from '../models/video.model';

import VideoInterface, { VideoRequestParam, VideoRequestQuery, VideoDBResponse } from '../types/video.types';
import { PaginationOptionsResult } from '../types/pagination.types';

import getPaginationOptions from '../util/pagination';
import { requestValidationHandler } from '../validations/video.validation';
import deleteVideoFiles from '../util/delete-video-files';

export const getVideos = (req: Request, res: Response) => {
  const { start = '0', end = '0' } = req.query as VideoRequestQuery;
  const pagiOption: PaginationOptionsResult = getPaginationOptions(start, end);

  if (pagiOption instanceof Error) {
    return errorResponseMaster({ response: res, errCode: 422, error: pagiOption });
  }

  return Promise
    .all([
      Video.count(),
      Video.findAll({ ...pagiOption }),
    ])
    .then(([total, videos]) => res.status(200).json({ videos, total }))
    .catch((err) => errorResponseMaster({ response: res, errCode: 500, error: err }));
};

export const getVideo = (req: Request, res: Response) => {
  const { videoId = 0 } = req.params as VideoRequestParam;

  if (videoId === 0) {
    return errorResponseMaster({ response: res, errCode: 404 });
  }

  return Video.findByPk(videoId)
    .then((video: VideoDBResponse) => {
      if (!video) {
        return errorResponseMaster({ response: res, errCode: 404 });
      }

      return res.status(200).json({ video });
    })
    .catch((err) => errorResponseMaster({ response: res, errCode: 500, error: err }));
};

export const postVideo = (req: Request, res: Response) => (
  requestValidationHandler(req)
    .then((filanames: string[]) => {
      const { title, description } = req.body as VideoInterface;

      const [videoFilename, thumbFilename] = filanames;

      return Video.create({
        title, description, videoFilename, thumbFilename,
      })
        .then((video: VideoInterface) => res.status(201).json({ video }))
        .catch((err) => errorResponseMaster({ response: res, errCode: 500, error: err }));
    })
    .catch((err) => errorResponseMaster({
      response: res, errCode: err.code, error: null, body: { message: err.msg.toString() },
    }))
);

export const deleteVideo = (req: Request, res: Response) => {
  const { videoId = 0 } = req.params as VideoRequestParam;
  if (videoId === 0) {
    return errorResponseMaster({ response: res, errCode: 404 });
  }

  return Video.findByPk(videoId)
    .then((video: VideoDBResponse): any => {
      if (!video) {
        return errorResponseMaster({ response: res, errCode: 404 });
      }
      const { videoFilename, thumbFilename } = video;
      return deleteVideoFiles({
        video: [{ filename: videoFilename }],
        thumb: [{ filename: thumbFilename }],
      });
    })
    .then(() => Video.destroy({ where: { id: videoId } }))
    .then(() => res.status(200).json({ message: 'deleted' }))
    .catch((err) => errorResponseMaster({ response: res, errCode: 500, error: err }));
};
