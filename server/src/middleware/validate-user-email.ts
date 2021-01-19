import { Request, Response, NextFunction } from "express"

import { UserDao } from "../dao"

async function validateUserEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  const user = await UserDao.getUserByEmail(email)

  if (user) {
    return res.status(422).json({ message: "User already exist with this email" })
  }

  next()
}

export default validateUserEmail