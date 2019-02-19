import uuidv1 from 'uuid/v1';

/**
 * Drones store (has to be used as a singleton child class)
 */
class DroneStore {
    constructor(){
        this._data = [];
    }

    add(item) {
        if (!item.x || !item.y || !item.quadrant) {
            return null;
        }

        let x = parseFloat(item.x);
        let y = parseFloat(item.y);
        let quadrant = parseInt(item.quadrant);
        let id  = uuidv1();
        let drone = {x, y, quadrant, id};

        this._data.push(drone);

        return drone;
    }

    get(id) {
        if (id) {
            return this._data.find(d => d.id === id);
        }

        return this._data;
    }

    remove(id) {
        let len = this._data.length;
        this._data = this._data.filter(item => item.id !== id);

        return len !== this._data.length;
    }
}

export default DroneStore;