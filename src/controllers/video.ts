import { Request, Response } from 'express';
import { VideoRequestParam } from './../interfaces/video';

export const getVideos = (req: Request, res: Response) => {
  res.status(200).json({ message: 'ok' });
}

export const getVideo = (req: Request, res: Response) => {
  res.status(200).json({ video: {} })
}

export const postVideo = (req: Request, res: Response) => {
  res.status(201).json({ message: 'ok' });
}

export const deleteVideo = (req: Request, res: Response) => {
  const params = req.params as VideoRequestParam;
  console.log(params);
  res.status(200).json({ message: 'ok' });
}