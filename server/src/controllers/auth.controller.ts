import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { Request, Response } from "express"

import { UserDao } from "../dao"
import ResponseErrors from "../constants/default-response-messages"

import passportConfig from "../config/passport"

export const postSingup = async (req: Request, res: Response) => {
  try {
    const { nickname, email, password } = req.body
    const { secret, expiresIn } = passportConfig

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await UserDao.createUser({ nickname, email, password: hashedPassword })

    const token = jwt.sign({ email, id: user.id }, secret, { expiresIn })

    return res.status(201).json({ id: user.id, role: user.role, token, expiresIn })
  } catch (error) {
    console.error(error)
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { secret, expiresIn } = passportConfig
    const user = await UserDao.getUserByEmail(email)

    if (!user) {
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    const isMatch = bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ email }, secret, { expiresIn })

      return res.status(200).json({ id: user.id, role: user.role, token, expiresIn })
    }

    return res.status(401).json(ResponseErrors.UNAUTHORIZED)

  } catch (error) {
    console.error(error)
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}