import { QueryInterface } from "sequelize/types"
import VideoModelSchema from "../schema/video.model.schema"

export async function up(queryInteface: QueryInterface) {
  await queryInteface.createTable("videos", VideoModelSchema)
}

export async function down(queryInteface: QueryInterface) {
  await queryInteface.dropTable("videos")
}
