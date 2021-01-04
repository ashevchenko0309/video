import {DataTypes} from 'sequelize';
import VideoInterface from '../interfaces/video.interface';

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
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Video;