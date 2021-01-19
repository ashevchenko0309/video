import { Router } from "express"
import passport from "passport"
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

router.post("/", passport.authenticate('jwt', { session: false }), uploadFile, [...videoValidation], postVideo)
router.delete("/:videoId", deleteVideo)

export default router
