import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'

import sequelize from './sqlz/models'
import { CategoryDao } from './dao'

import apiRoutes from './routes/api.routes'

const CLIENT_FOLDER = path.join(__dirname, '..', 'client', 'build')
const CACHE_TIME = 86400000 * 30

const app = express()

app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  app.use(cors())
}

app.use(express.static(CLIENT_FOLDER))

app.use('/videos', express.static(path.join(__dirname, '..', 'uploads', 'videos'), { maxAge: CACHE_TIME }))
app.use('/thumbs', express.static(path.join(__dirname, '..', 'uploads', 'thumbs'), { maxAge: CACHE_TIME }))

app.use('/api', apiRoutes)

sequelize
  .sync() //{ force: true }
  .then(() => CategoryDao.findById(1))
  .then((category) => {
    if (!category) {
      return CategoryDao.create('Common')
    }
    return category
  })
  .then(() => app.listen(3000))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export default app;
