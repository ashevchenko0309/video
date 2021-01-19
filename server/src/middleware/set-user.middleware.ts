import { Request, Response, NextFunction } from "express"

import ResponseErrors from "../constants/default-response-messages"

import { UserDao } from "../dao"

export async function setUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body
    const user = await UserDao.getUserByEmail(email)

    if (!user) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    req.user = user

    next()

  } catch (error) {
    console.error(error)
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}