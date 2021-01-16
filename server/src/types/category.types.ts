import { Model } from "sequelize"

interface Category extends Model {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

type CategoryRequestParam = { categoryId: string }

type CategoryDBResponse = Category | null

export { CategoryRequestParam, CategoryDBResponse }

export default Category
