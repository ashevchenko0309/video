import { Request, Response } from 'express';

import { CategoryDao, VideoDao } from "../dao/index"

import { VideoRequestParam, VideoRequestQuery, VideoRequest } from '../types/video.types'
import { PaginationOptionsResult } from '../types/pagination.types'

import getPaginationOptions from '../util/pagination'
import { requestValidationHandler } from '../validations/video.validation'
import ResponseErrors from '../constants/default-response-messages'
import deleteVideoFiles from '../util/delete-video-files'

export const getVideos = async (req: Request, res: Response) => {
  try {
    const { start = '0', end = '0' } = req.query as VideoRequestQuery;
    const pagiOption: PaginationOptionsResult = getPaginationOptions(start, end);

    if (!pagiOption) {
      return res.status(422).json(ResponseErrors.INVALID_PAGINATION)
    }

    const { rows, count } = await VideoDao.findAll(pagiOption)

    res.status(200).json({ rows, count })
  } catch (error) {
    console.error(error)
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
};

export const getVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params as VideoRequestParam
    const n_videoId = +videoId

    if (n_videoId === 0) {
      return res.status(404)
    }

    const video = VideoDao.find(n_videoId)

    if (!video) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    res.status(200).json({ video })
  } catch (error) {
    console.error(error)
    res.status(500)
  }
};

export const postVideo = async (req: Request, res: Response) => {
  try {
    const files = await requestValidationHandler(req);

    // TODO: check validation

    const { title, description, categoryName, categoryId } = req.body as VideoRequest
    const [videoFilename, thumbFilename] = files

    if (categoryId) {
      const video = await VideoDao.create({
        title,
        description,
        videoFilename,
        thumbFilename,
        categoryId: +categoryId
      })
      return res.status(201).json({ video })
    }

    if (categoryName) {
      const category = await CategoryDao.create(categoryName)
      const video = await VideoDao.create({ title, description, videoFilename, thumbFilename, categoryId: category.id })
      return res.status(201).json({ video })
    }

    // TODO: create normal handler
    return res.status(422).json({ message: "Validation..." })
  } catch (error) {
    console.error(error);
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params as VideoRequestParam
    const n_videoId = +videoId

    if (n_videoId === 0) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    const video = await VideoDao.find(n_videoId)

    if (video === null) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    // TODO: delete files

    await VideoDao.deleteVideo(n_videoId)

    return res.status(200).json(ResponseErrors.SUCCESS)
  } catch (error) {
    console.error(error)
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
};
