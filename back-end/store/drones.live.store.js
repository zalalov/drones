import DroneStore from './drones.store';
import {random} from '../utils/random';

/**
 * Drones alive store singleton
 */
class DroneLiveStore extends DroneStore {
    constructor(args){
        super(args);

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
        if (!!this._data.length) {
            this._data[0].x = this._data[0].x - 1;
        }
    }
}

const instance = new DroneLiveStore();
setInterval(instance.move, 1000);

export default instance;