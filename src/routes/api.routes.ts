import { Router } from 'express';
import videoRoutes from './video.routes';

const router = Router();

router.use('/video', videoRoutes)

export default router;
