import Video from '../sqlz/models/video.model'
import { PaginationOptions } from '../types/pagination.types'
import VideoInterface, { CreateVideoInterface } from '../types/video.types'

export function create(video: CreateVideoInterface): Promise<any> {
  const { title, description, videoFilename, thumbFilename, categoryId } = video;

  return Video
    .create({ title, description, videoFilename, thumbFilename, categoryId })
}

export function find(videoId: number): Promise<VideoInterface | null> {
  return Video
    .findByPk(videoId)
}

export function findAll(options: PaginationOptions): Promise<{ rows: VideoInterface[], count: number }> {
  return Video
    .findAndCountAll({ ...options })
}

export function findAllByCategoryId(id: number, options: PaginationOptions): Promise<{ rows: VideoInterface[], count: number }> {
  return Video
    .findAndCountAll({ where: { id }, ...options })
}

export function deleteVideo(videoId: number): Promise<any> {
  return Video
    .destroy({ where: { id: videoId } })
}