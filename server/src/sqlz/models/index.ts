import { Sequelize } from "sequelize"
import config from "../../config/config.json"

if (!process.env.NODE_ENV) {
  console.error("Start app with NODE_ENV variable")
  process.exit(1)
}

const env: string = process.env.NODE_ENV

const sequelize = new Sequelize( // @ts-ignore
  config[env].database, // @ts-ignore
  config[env].username, // @ts-ignore
  config[env].password, // @ts-ignore
  {
    // @ts-ignore
    dialect: config[env].dialect, // @ts-ignore
    host: config[env].host,
  },
);

export default sequelize
