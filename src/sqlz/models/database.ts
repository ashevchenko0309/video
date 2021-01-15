import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'video',
  'root',
  '1qaz2wsx3edc',
  {
    dialect: 'mysql',
    host: 'localhost',
  },
);

export default sequelize;
