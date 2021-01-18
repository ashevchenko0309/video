import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator"

import { UserDao } from "../dao"
import ResponseErrors from "../constants/default-response-messages"

export const postSingup = async (req: Request, res: Response) => {
  try {

    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
      return res.status(422).json(validationErrors.array())
    }

    const { nickname, email, password } = req.body

    let user = await UserDao.getUserByNickname(nickname)

    if (user) {
      return res.status(422).json({ message: "User already exist with this nickname" })
    }

    user = await UserDao.getUserByEmail(email)

    if (user) {
      return res.status(422).json({ message: "User already exist with this email" })
    }

    const hashedPassword = await bcrypt.hash(password, 32)

    await UserDao.createUser({ nickname, email, password: hashedPassword })

    return res.status(201).json({ message: "Ok" })
  } catch (error) {
    console.log(error)
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}

export const postLogin = async (req: Request, res: Response) => {
  try {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
      return res.status(422).json(validationErrors.array())
    }

    const { password } = req.body
    const user = req.user

    const isMatch = bcrypt.compare(password, user.password)

    if (isMatch) {
      req.session.isLoggedIn = true
      req.session.user = user
      return req.session.save(function (error) {
        if (error) {
          console.error(error)
          return res.status(500).json(ResponseErrors.SERVER_ERROR)
        }
        res.status(200).json({ message: "Ok" })
      })
    }

    return res.status(401).json(ResponseErrors.UNAUTHORIZED)

  } catch (error) {
    console.log(error)
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}