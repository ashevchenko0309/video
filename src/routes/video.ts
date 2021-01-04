import { Router } from 'express';
import { getVideos, getVideo, deleteVideo, postVideo } from './../controllers/video';

const router = Router();

router.get('/', getVideos);
router.get('/:videoId', getVideo);

router.post('/', postVideo);
router.delete('/video/:videoId', deleteVideo);

export default router;
