import { Request, Response } from 'express';

import { CategoryDao, VideoDao } from "../dao/index"

import errorResponseMaster from '../util/error-responses';

import Video from '../sqlz/models/video.model';

import VideoInterface, { VideoRequestParam, VideoRequestQuery, VideoRequest } from '../types/video.types';
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

  return VideoDao
    .findAll(pagiOption)
    .then(([total, videos]) => res.status(200).json({ videos, total }))
    .catch((error) => console.log(error)); //errorResponseMaster({ response: res, errCode: 500, error: err })
};

export const getVideo = (req: Request, res: Response) => {
  const { videoId } = req.params as VideoRequestParam
  const n_videoId = parseFloat(videoId)

  if (n_videoId === 0) {
    return errorResponseMaster({ response: res, errCode: 404 });
  }

  return VideoDao
    .find(n_videoId)
    .then((video) => {
      if (!video) {
        return res.status(404)
      }
      return res.status(200).json({ video })
    })
    .catch((error) => console.log(error))
};

export const postVideo = async (req: Request, res: Response) => {
  const files = await requestValidationHandler(req);
  const { title, description, categoryName, categoryId } = req.body as VideoRequest
  const [videoFilename, thumbFilename] = files

  if (categoryId) {
    return VideoDao
      .create({ title, description, videoFilename, thumbFilename, categoryId: +categoryId })
      .then((video: VideoInterface) => res.status(201).json({ video }))
      .catch((error) => console.log(error));
  }

  if (categoryName) {
    return CategoryDao
      .create(categoryName)
      .then((category) => VideoDao.create({ title, description, videoFilename, thumbFilename, categoryId: category.id }))
      .then((video: VideoInterface) => res.status(201).json({ video }))
      .catch((error) => console.log(error))
  }

  return res.status(422)

}

export const deleteVideo = async (req: Request, res: Response) => {
  const { videoId } = req.params as VideoRequestParam
  const n_videoId = parseFloat(videoId)
  if (n_videoId === 0) {
    return errorResponseMaster({ response: res, errCode: 404 })
  }

  const video = await VideoDao.find(n_videoId)

  if (video === null) {
    return res.status(404)
  }

  console.log(video)

  return VideoDao
    .deleteVideo(n_videoId)
    .then(() => res.status(200))
    .catch((error) => console.log(error))
};
