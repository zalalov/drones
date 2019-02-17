import uuidv1 from 'uuid/v1';
import DroneStore from './drones.store';
import {random} from '../utils/random';

/**
 * Drones alive store singleton
 */
class DroneLiveStore extends DroneStore {
    // TODO: REMOVE
    constructor(args){
        super(args);

        this._data = [
            {
                x: 100,
                y: 150,
                quadrant: 11,
                id: "f90df2d0-32ae-11e9-8c69-6f5b69a47da2"
            },
            {
                x: 100,
                y: 150,
                quadrant: 10,
                id: "f91fcd20-32ae-11e9-8c69-6f5b69a47da2"
            },
            {
                x: 100,
                y: 150,
                quadrant: 10,
                id: "f9366260-32ae-11e9-8c69-6f5b69a47da2"
            },
            {
                x: 100,
                y: 150,
                quadrant: 10,
                id: "f94ca980-32ae-11e9-8c69-6f5b69a47da2"
            },
            {
                x: 100,
                y: 150,
                quadrant: 10,
                id: "f962c990-32ae-11e9-8c69-6f5b69a47da2"
            }
        ];

        this.move = this.move.bind(this);
    }

    move() {
        let val;

        this._data = this._data.map(item => {
            val = random(0, 4);

            switch (val) {
                case 0:
                    item.x = item.x + 1;
                    break;

                case 1:
                    item.x = item.x - 1;
                    break;

                case 2:
                    item.y = item.y + 1;
                    break;

                case 3:
                    item.y = item.y - 1;
                    break;

                default:
                    break;
            }

            return item;
        });

        // Make the first drone to leave the quadrant in future
        this._data[0].x = this._data[0].x - 1;
    }
}

const instance = new DroneLiveStore();
setInterval(instance.move, 1000);

export default instance;