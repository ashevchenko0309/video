import CategoryModelSchema from "../schema/category.model.schema"
import Video from "./video.model";
import CategoryInterface from "../../types/category.types";

import sequelize from '.';

const Category = sequelize.define<CategoryInterface>('category', CategoryModelSchema);

Category.hasMany(Video);
Video.belongsTo(Category);

export default Category;
