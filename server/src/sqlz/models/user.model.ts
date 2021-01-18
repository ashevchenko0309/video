import UserModelSchema from "../schema/user.model.schema"
import Video from "./video.model"
import UserInterface from "../../types/user.types"

import sequelize from "."

const User = sequelize.define<UserInterface>(
  "users",
  UserModelSchema,
)

User.hasMany(Video)
Video.belongsTo(User)

export default User