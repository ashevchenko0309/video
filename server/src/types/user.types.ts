import { Mode } from "fs";
import { Model } from "sequelize"

interface User extends Model {
  id: number,
  email: string,
  password: string,
  role: string,
  createdAt: string,
  updatedAt: string
}

export default User