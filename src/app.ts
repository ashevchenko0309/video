import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import sequelize from './util/database';

import videoRouter from './routes/video.routes';

const CLIENT_FOLDER = path.join(__dirname, '..', 'client', 'build');
const CLIENT_INDEX = path.join(CLIENT_FOLDER, 'index.html');

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use(express.static(CLIENT_FOLDER));

app.use('/videos', express.static(path.join(__dirname, '..', 'uploads', 'videos'), { maxAge: 86400000 * 30 }));
app.use('/thumbs', express.static(path.join(__dirname, '..', 'uploads', 'thumbs'), { maxAge: 86400000 * 30 }));

app.use('/api', videoRouter);

// app.get('/*', function (req, res) {
  // res.sendFile(CLIENT_INDEX);
// });

sequelize
  .sync() //{force: true}
  .then(() => app.listen(3000))
  .catch(err => {
    console.error(err);
    process.exit(1);
  })


export default app;


