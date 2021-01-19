import { Request, Response, NextFunction } from "express"

import { UserDao } from "../dao"

async function validateUserNickname(req: Request, res: Response, next: NextFunction) {
  const { nickname } = req.body;
  const user = await UserDao.getUserByNickname(nickname)

  if (user) {
    return res.status(422).json({ message: "User already exist with this nickname" })
  }

  next()
}

export default validateUserNickname