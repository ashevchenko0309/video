import { Router } from 'express';
import videoRoutes from './video/video.routes';
import categoryRoutes from './categories/category.routes';

const router = Router();

router.use('/videos', videoRoutes);
router.use('/categories', categoryRoutes);

export default router;
