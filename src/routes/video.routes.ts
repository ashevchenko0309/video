import { Router } from 'express';
import { getVideos, getVideo, deleteVideo, postVideo } from '../controllers/video.controller';

import videoValidation from './../validations/video.validation';

import uploadFile from './../util/multer';

const router = Router();

router.get('/video', getVideos);
router.get('/video/:videoId', getVideo);

router.post('/video', uploadFile, [...videoValidation], postVideo);
router.delete('/video/:videoId', deleteVideo);

export default router;
