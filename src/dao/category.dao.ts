import Category from '../sqlz/models/category.model';
import CategoryInterface from '../types/category.types'

export function create(categoryName: string): Promise<any> {
  return Category
    .create({ name: categoryName })
}

export function findById(categoryId: number): Promise<CategoryInterface | null> {
  return Category
    .findByPk(categoryId)
}

export function findByName(where: any): Promise<CategoryInterface | null> {
  return Category
  .findOne({ where })
}

export function findAll(categoryId: number): Promise<CategoryInterface[]> {
  return Category
    .findAll()
}