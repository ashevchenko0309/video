import { Sequelize } from 'sequelize'
import config from './../config/config'

const sequelize = new Sequelize(
  config.dbName,
  config.dbUsername,
  config.dbPassword,
  {
    // @ts-ignore
    dialect: config.dbDialect, 
    host: config.dbHost,
  },
);

export default sequelize
