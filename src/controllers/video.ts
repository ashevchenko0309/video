import { Request, Response } from 'express';
import Video from './../models/video';

import VideoInterface, { VideoRequestParam } from './../interfaces/video';

const notFoundHandler = (res: Response) => res.status(404).json({ message: 'not found!' })
const serverErrorHandler = (res: Response, error: Error) => res.status(500).json({ error: `Something went wrong: ${error}` })

export const getVideos = (req: Request, res: Response) => {
  // @TODO - pagination
  Video.findAll()
    .then((videos: VideoInterface[]) => res.status(200).json({ videos }))
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
  // @TODO - validation
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