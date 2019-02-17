import express from 'express';
import dronesRoutes from './drones.route';
import quadrantsRoutes from './quadrants.route';

const router = express.Router();

router.use('/drones', dronesRoutes);
router.use('/quadrants', quadrantsRoutes);

export default router;