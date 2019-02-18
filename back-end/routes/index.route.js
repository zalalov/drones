import express from 'express';
import dronesRoutes from './drones.route';

const router = express.Router();

router.use('/drones', dronesRoutes);

export default router;