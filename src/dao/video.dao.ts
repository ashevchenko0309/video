import Category from '../sqlz/models/category.model';
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
    .findByPk(videoId, { include: Category })
}

export function findAll(options: PaginationOptions): Promise<{ rows: VideoInterface[], count: number }> {
  return Video
    .findAndCountAll({ ...options, include: Category})
}

export function findAllByCategoryId(id: number, options: PaginationOptions): Promise<{ rows: VideoInterface[], count: number }> {
  return Video
    .findAndCountAll({ where: { categoryId: id }, ...options, include: Category })
}

export function deleteVideo(videoId: number): Promise<any> {
  return Video
    .destroy({ where: { id: videoId } })
}