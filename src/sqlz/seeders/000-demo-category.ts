import { QueryInterface } from "sequelize/types";

export async function up(queryInteface: QueryInterface) {
  return await queryInteface.bulkInsert('categories', [{
    name: 'Common',
    createdAt: new Date(),
    updatedAt: new Date(),
  }])
}

export async function name(queryInteface: QueryInterface) {
  return await queryInteface.bulkDelete('categories', {}, {})
}