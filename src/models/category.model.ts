import { DataTypes } from 'sequelize';
import Video from "../models/video.model";
import CategoryInterface from '../types/category.types';

import sequelize from '../util/database';

const Category = sequelize.define<CategoryInterface>('category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.hasMany(Video);
Video.belongsTo(Category);

export default Category;
