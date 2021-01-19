import { Request, Response } from "express"

import { CategoryDao, VideoDao } from "../dao/index"
import {
  VideoRequestParam,
  VideoRequestQuery,
  VideoRequest,
} from "../types/video.types"
import { PaginationOptionsResult } from "../types/pagination.types"
import getPaginationOptions from "../util/pagination"
import deleteVideoFiles from "../util/delete-video-files"
import {
  hasRequestError,
  hasRequestFilesError,
} from "../validations/video.validation"
import ResponseErrors from "../constants/default-response-messages"

export const getVideos = async (req: Request, res: Response) => {
  try {
    const {
      start = "0",
      end = "0",
      category = "0",
      user = "0"
    } = req.query as VideoRequestQuery
    const pagiOption: PaginationOptionsResult = getPaginationOptions(start, end)
    let where: { categoryId?: number, userId?: number } = {}

    if (!pagiOption) {
      return res.status(422).json(ResponseErrors.INVALID_PAGINATION)
    }

    if (category !== "0") {
      where.categoryId = +category
    }

    if (user !== "0") {
      where.userId = +user
    }

    const { rows, count } = await VideoDao.findAll(pagiOption, where)

    return res.status(200).json({ rows, count })
  } catch (error) {
    console.error(error)
    return res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}

export const getVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params as VideoRequestParam
    const numVideoId = +videoId

    if (numVideoId === 0) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    const video = await VideoDao.find(numVideoId)

    if (!video) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    return res.status(200).json({ video })
  } catch (error) {
    console.error(error)
    return res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}

export const postVideo = async (req: Request, res: Response) => {
  try {
    let validationErrors = []
    let requestFiles = []
    const user: any = req.user // TODO: fix this typo

    if (!user || !user.id) {
      return res.status(401).json(ResponseErrors.UNAUTHORIZED)
    }

    validationErrors = await hasRequestError(req)

    if (validationErrors.length > 0) {
      return res.status(422).json({ message: validationErrors })
    }

    requestFiles = await hasRequestFilesError(req)

    if (requestFiles.length === 0) {
      return res
        .status(422)
        .json({ message: "No video file or thumb file exists" })
    }

    const {
      title,
      description,
      categoryName,
      categoryId,
    } = req.body as VideoRequest
    const [videoFilename, thumbFilename] = requestFiles

    if (categoryId) {
      const category = await CategoryDao.findById(+categoryId)
      const video = await VideoDao.create({
        title,
        description,
        videoFilename,
        thumbFilename,
        categoryId: +categoryId,
        userId: user.id
      })
      return res.status(201).json({ video, category, user })
    }

    if (categoryName) {
      const category = await CategoryDao.create(categoryName)
      const video = await VideoDao.create({
        title,
        description,
        videoFilename,
        thumbFilename,
        categoryId: category.id,
        userId: user.id
      })
      return res.status(201).json({ video, category })
    }

    return res
      .status(422)
      .json({ message: "categoryId or categoryName must be exist..." })
  } catch (error) {
    console.error(error)
    return res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params as VideoRequestParam
    const numVideoId = +videoId

    if (numVideoId === 0) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    const video = await VideoDao.find(numVideoId)

    if (video === null) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    await deleteVideoFiles({
      video: [{ filename: video.videoFilename }],
      thumb: [{ filename: video.thumbFilename }],
    })

    // TODO: delete files

    await VideoDao.deleteVideo(numVideoId)

    return res.status(200).json(ResponseErrors.SUCCESS)
  } catch (error) {
    console.error(error)
    return res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}
