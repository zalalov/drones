import express from 'express';
import * as droneCtrl from '../controllers/drone.controller';
import validate from '../config/joi.validate';
import schema from '../utils/validator';
import HttpStatus from 'http-status-codes';

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.json(droneCtrl.quadrants());
    });

export default router;