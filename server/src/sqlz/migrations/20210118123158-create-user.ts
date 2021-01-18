import { QueryInterface } from "sequelize/types"
import UserModelSchema from "../schema/user.model.schema"

export async function up(queryInteface: QueryInterface) {
  await queryInteface.createTable("users", UserModelSchema)
}

export async function down(queryInteface: QueryInterface) {
  await queryInteface.dropTable("users")
}