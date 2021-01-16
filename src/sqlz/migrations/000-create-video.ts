import VideoModelSchema from "../schema/video.model.schema"
import { QueryInterface } from 'sequelize/types'

export async function up(queryInteface: QueryInterface) {
  await queryInteface.createTable('video', VideoModelSchema)
}

export async function down(queryInteface: QueryInterface) {
  await queryInteface.dropTable('video')
}