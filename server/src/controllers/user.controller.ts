import { Request, Response } from "express"

import { UserRequestParam } from "../types/user.types"
import ResponseErrors from "../constants/default-response-messages"
import { UserDao } from "../dao"

export const postDeleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as UserRequestParam
    const numUserId = +userId

    const user = await UserDao.getUser(numUserId)

    if(!user){
      return res.status(404).json(ResponseErrors.NOT_FOUND)
    }

    await UserDao.deleteUser(user.id)

    return res.status(200).json({ message: "Ok" })
  } catch (error) {
    console.error(error);
    res.status(500).json(ResponseErrors.SERVER_ERROR)
  }
}