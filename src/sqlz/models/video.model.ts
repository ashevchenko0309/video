import VideoModelSchema from '../schema/video.model.schema'
import VideoInterface from '../../types/video.types';

import sequelize from '.';

const Video = sequelize.define<VideoInterface>('video', VideoModelSchema);

export default Video;
