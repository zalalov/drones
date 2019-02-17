import Joi from 'joi';

export default {
    storeDrone: {
        body: {
            x: Joi.number().required(),
            y: Joi.number().required(),
            quadrant: Joi.number().required()
        }
    },
};