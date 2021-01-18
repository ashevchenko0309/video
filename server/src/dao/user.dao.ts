import User from "../sqlz/models/user.model"
import { CreateUserInterface } from "../types/user.types"

export async function createUser(user: CreateUserInterface): Promise<any> {
  const { nickname, email, password, } = user

  return User
    .create({ nickname, email, password })
}

export async function getUser(userId: number): Promise<any> {
  return User
    .findByPk(userId)
}

export async function getUserByEmail(email: string) {
  return User
    .findOne({ where: { email } })
}

export async function getUserByNickname(nickname: string) {
  return User
    .findOne({ where: { nickname } })
}

export async function deleteUser(userId: number) {
  return User.destroy({ where: { id: userId } })
}