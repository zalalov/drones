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

        item['id'] = uuidv1();
        this._data.push(item);

        return item;
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