import { Model } from 'sequelize';

interface Category extends Model {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
}

type CategoryDBResponse = Category | null;

export default Category;
