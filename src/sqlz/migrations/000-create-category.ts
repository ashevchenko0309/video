import CategoryModelSchema from "../schema/category.model.schema"
import { QueryInterface } from "sequelize"

export async function up(queryInteface: QueryInterface) {
  await queryInteface.createTable('categories', CategoryModelSchema)
}

export async function down(queryInteface: QueryInterface) {
  await queryInteface.dropTable('categories')
}