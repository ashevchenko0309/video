import { DataTypes } from 'sequelize';
import VideoInterface from '../types/video.types';

import sequelize from '../util/database';

const Video = sequelize.define<VideoInterface>('video', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoFilename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbFilename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Video;
