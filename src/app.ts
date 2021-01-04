import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './util/database';

import videoRouter from './routes/video';

const app = express();

app.use(bodyParser.json());

app.use('/video', videoRouter);

sequelize
  .sync() //{force: true}
  .then(() => app.listen(3000))
  .catch(err => {
    console.error(err);
    process.exit(1);
  })


