import multer from "multer"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export const VIDEO_PATH = path.join("./uploads", "videos")
export const THUMB_PATH = path.join("./uploads", "thumbs")

function getFilename(file: Express.Multer.File) {
  const type = file.mimetype.split("/")[1]
  return `${uuidv4()}.${type}`
}

function fileMaster(
  type: 'destination' | 'filename',
  file: Express.Multer.File | null,
  callback: Function,
) {
  if (file === null) {
    return callback(null, "")
  }

  if (file.fieldname === "video") {
    if (type === "destination") {
      return callback(null, VIDEO_PATH)
    }

    const filename = getFilename(file)
    return callback(null, filename)
  }

  if (file.fieldname === "thumb") {
    if (type === "destination") {
      return callback(null, THUMB_PATH)
    }

    const filename = getFilename(file)
    return callback(null, filename)
  }

  return callback(new Error("no file"), "")
}

const storage = multer.diskStorage({
  destination(_, file, callback) {
    fileMaster("destination", file, callback)
  },
  filename(_, file, callback) {
    fileMaster("filename", file, callback)
  },
});

const uploadFile = multer({ storage }).fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumb', maxCount: 1 },
])

export default uploadFile
