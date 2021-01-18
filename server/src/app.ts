import express from "express"
import bodyParser from "body-parser"
import path from "path"
import cors from "cors"
import session from "express-session"

import sequelize from "./sqlz/models"

import apiRoutes from "./routes/api.routes"

const CLIENT_FOLDER = path.join(__dirname, "..", "..", "client", "build")
const CACHE_TIME = 86400000 * 30
const SESSION_SECRET = "FjfgT9j4mWMS8VQ5zWJSarLChRNuX99d"

const app = express()

app.use(bodyParser.json())

if (process.env.NODE_ENV === "development") {
  app.use(cors())
}

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(express.static(CLIENT_FOLDER))

app.use(
  "/videos",
  express.static(path.join(__dirname, "..", "uploads", "videos"), {
    maxAge: CACHE_TIME,
  })
)
app.use(
  "/thumbs",
  express.static(path.join(__dirname, "..", "uploads", "thumbs"), {
    maxAge: CACHE_TIME,
  })
)

app.use("/api", apiRoutes)

sequelize
  .sync() // { force: true }
  .then(() => app.listen(3000))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

export default app
