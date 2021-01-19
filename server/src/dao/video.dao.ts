import User from "../sqlz/models/user.model"
import Category from "../sqlz/models/category.model"
import Video from "../sqlz/models/video.model"
import { PaginationOptions } from "../types/pagination.types"
import VideoInterface, { CreateVideoInterface } from "../types/video.types"

const DEFAULT_INCLUDES = [
  { model: Category, attributes: { exclude: ["createdAt", "updatedAt"] } },
  { model: User, attributes: { exclude: ["email", "password", "role", "createdAt", "updatedAt"] } }
]

export function create(video: CreateVideoInterface): Promise<any> {
  const {
    title, description, videoFilename, thumbFilename, categoryId, userId,
  } = video

  return Video.create({
    title,
    description,
    videoFilename,
    thumbFilename,
    categoryId,
    userId,
  })
}

export function find(videoId: number): Promise<VideoInterface | null> {
  return Video.findByPk(videoId, { include: DEFAULT_INCLUDES })
}

export function findAll(
  options: PaginationOptions,
  where: any
): Promise<{
  rows: VideoInterface[]
  count: number
}> {
  return Video.findAndCountAll({
    ...options,
    where,
    order: [
      ['createdAt', 'DESC'],
    ],
    include: DEFAULT_INCLUDES,
  })
}

export function findAllByCategoryId(
  id: number,
  options: PaginationOptions,
): Promise<{
  rows: VideoInterface[]
  count: number
}> {
  return Video.findAndCountAll({
    where: { categoryId: id },
    ...options,
    order: [
      ['createdAt', 'DESC'],
    ],
    include: DEFAULT_INCLUDES,
  })
}

export function findAllByUserId(
  id: number,
  options: PaginationOptions,
): Promise<{
  rows: VideoInterface[]
  count: number
}> {
  return Video.findAndCountAll({
    where: { userId: id },
    ...options,
    order: [
      ['createdAt', 'DESC'],
    ],
    include: DEFAULT_INCLUDES,
  })
}

export function deleteVideo(videoId: number): Promise<any> {
  return Video.destroy({ where: { id: videoId } })
}
