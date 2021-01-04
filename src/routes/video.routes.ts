import { Router } from 'express';
import { createVideoValidation } from './../validations/video.validation';

import { getVideos, getVideo, deleteVideo, postVideo } from '../controllers/video.controller';

const router = Router();

router.get('/', getVideos);
router.get('/:videoId', getVideo);

router.post('/', [...createVideoValidation], postVideo);
router.delete('/:videoId', deleteVideo);

export default router;
