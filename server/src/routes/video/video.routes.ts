import { Router } from "express"
import {
  getVideos,
  getVideo,
  deleteVideo,
  postVideo,
} from "../../controllers/video.controller"

import videoValidation from "../../validations/video.validation"

import uploadFile from "../../util/multer"

const router = Router()

router.get("/", getVideos)
router.get("/:videoId", getVideo)

router.post("/", uploadFile, [...videoValidation], postVideo)
router.delete("/:videoId", deleteVideo)

export default router
