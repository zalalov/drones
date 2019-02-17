import express from 'express';
import * as droneCtrl from '../controllers/drone.controller';
import validate from '../config/joi.validate';
import schema from '../utils/validator';
import HttpStatus from 'http-status-codes';

const router = express.Router();

router.route('/')
    .post(validate(schema.storeDrone), (req, res) => {
        const {x, y, quadrant} = req.body;

        let drone = droneCtrl.store(x, y, quadrant);

        if (drone) {
            res.json(drone);
        } else {
            res.sendStatus(HttpStatus.BAD_REQUEST);
        }
    })
    .get((req, res) => {
        res.json(droneCtrl.list());
    });

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;

        let drone = droneCtrl.findById(id);

        if (drone) {
            res.json(drone);
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                error: 'Drone not found.'
            })
        }
    })
    .delete((req, res) => {
        const id = req.params.id;

        if (droneCtrl.destroy(id)) {
            res.sendStatus(HttpStatus.OK);
        } else {
            res.sendStatus(HttpStatus.BAD_REQUEST);
        }
    });

export default router;