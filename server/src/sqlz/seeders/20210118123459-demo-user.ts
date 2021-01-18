import { QueryInterface } from "sequelize/types"
import bcrypt from "bcrypt"

export function up(queryInteface: QueryInterface) {
  const password = bcrypt.hashSync("admin123", 12)

  return queryInteface.bulkInsert("users", [
    {
      password,
      email: "admin@admin.com",
      nickname: "SuperAdmin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
}

export function name(queryInteface: QueryInterface) {
  return queryInteface.bulkDelete("users", {}, {})
}