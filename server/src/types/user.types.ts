import { Model } from "sequelize"

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

interface User extends Model {
  id: number,
  nickname: string,
  email: string,
  password: string,
  role: string,
  createdAt: string,
  updatedAt: string
}

interface CreateUserInterface {
  nickname: string,
  email: string,
  password: string,
}

type UserRole = {
  role: "admin" | "user"
}

type UserRequestParam = { userId: string }

export { UserRole, CreateUserInterface, UserRequestParam }

export default User