import User from "../sqlz/models/user.model"
import IUser, { CreateUserInterface } from "../types/user.types"

export async function createUser(user: CreateUserInterface): Promise<IUser> {
  const { nickname, email, password, } = user

  return User
    .create({ nickname, email, password })
}

export async function getUser(where: object): Promise<IUser | null> {
  return User
    .findOne({ where })
}

export async function getUserById(userId: number): Promise<IUser | null> {
  return User
    .findByPk(userId)
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return User
    .findOne({ where: { email } })
}

export async function getUserByNickname(nickname: string): Promise<IUser | null> {
  return User
    .findOne({ where: { nickname } })
}

export async function deleteUser(userId: number) {
  return User.destroy({ where: { id: userId } })
}