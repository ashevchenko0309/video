import {Model} from 'sequelize';

interface Video extends Model {
  id: number,
  title: string,
  description: string,
  // videoUrl: string
  createdAt: string,
  updatedAt: string,
}

type VideoRequestParam = { videoId: string };

export { VideoRequestParam };

export default Video;