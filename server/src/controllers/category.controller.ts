import { Request, Response } from "express"

import { CategoryDao } from "../dao/index"
import ResponseErrors from "../constants/default-response-messages"
import { CategoryRequestParam } from "../types/category.types"

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryDao.findAll()
    res.status(200).json({ categories })
  } catch (error) {
    console.error(error)
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params as CategoryRequestParam
    const numCategoryId = +categoryId

    if (numCategoryId) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    const category = await CategoryDao.findById(+categoryId)

    if (!category) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    return res.status(200).json({ category })
  } catch (error) {
    console.error(error)
    return res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}
