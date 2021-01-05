import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import sequelize from './util/database';

import videoRouter from './routes/video.routes';

const app = express();

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads', 'videos')));
app.use('/thumbnails', express.static(path.join(__dirname, '..', 'uploads', 'thumbnails')));

app.use('/video', videoRouter);

sequelize
  .sync() //{force: true}
  .then(() => app.listen(3000))
  .catch(err => {
    process.exit(1);
  })


