import { QueryInterface } from "sequelize/types"

export function up(queryInteface: QueryInterface) {
  return queryInteface.bulkInsert("categories", [
    {
      name: "Common",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
}

export function name(queryInteface: QueryInterface) {
  return queryInteface.bulkDelete("categories", {}, {})
}
