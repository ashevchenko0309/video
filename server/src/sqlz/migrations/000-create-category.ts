import { QueryInterface } from "sequelize"
import CategoryModelSchema from "../schema/category.model.schema"

export async function up(queryInteface: QueryInterface) {
  await queryInteface.createTable("categories", CategoryModelSchema)
}

export async function down(queryInteface: QueryInterface) {
  await queryInteface.dropTable("categories")
}
