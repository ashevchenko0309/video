import {Model} from 'sequelize';

interface Video extends Model {
  id: number,
  title: string,
  description: string,
  videoFilename: string,
  thumbFilename: string,
  createdAt: string,
  updatedAt: string,
}

type VideoDBResponse = Video | null

type VideoRequestParam = { videoId: string };

type VideoRequestQuery = { start: string, end: string };

export { VideoRequestParam, VideoRequestQuery, VideoDBResponse };

export default Video;