import { Model } from "sequelize"

interface Video extends Model {
  id: number
  title: string
  description: string
  videoFilename: string
  thumbFilename: string
  categoryId: number
  categoryName?: string
  createdAt: string
  updatedAt: string
}

type VideoRequest = {
  title: string
  description: string
  videoFilename: string
  thumbFilename: string
  categoryId?: number
  categoryName?: string
};

interface CreateVideoInterface {
  title: string
  description: string
  videoFilename: string
  thumbFilename: string
  categoryId: number
}

type VideoDBResponse = Video | null

type VideoRequestParam = { videoId: string }

type VideoRequestQuery = { start: string; end: string; category: string, user: string }

export {
  CreateVideoInterface,
  VideoRequest,
  VideoRequestParam,
  VideoRequestQuery,
  VideoDBResponse,
}

export default Video
