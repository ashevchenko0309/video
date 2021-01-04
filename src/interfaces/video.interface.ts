import {Model} from 'sequelize';

interface Video extends Model {
  id: number,
  title: string,
  description: string,
  videoUrl: string
  createdAt: string,
  updatedAt: string,
}

type VideoRequestParam = { videoId: string };

type VideoRequestQuery = { start: string, end: string };

export { VideoRequestParam, VideoRequestQuery };

export default Video;