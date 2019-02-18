import droneStore from '../store/drones.live.store';

/**
 * Get list of drones
 * @returns {*}
 */
export function list() {
    return droneStore.get();
}

/**
 * Find drone by id
 * @param id
 * @returns {*}
 */
export function findById(id) {
    return droneStore.get(id);
}


/**
 * Store new drone
 * @param x
 * @param y
 * @param quadrant
 */
export function store(x, y, quadrant) {
    return droneStore.add({
        x: x,
        y: y,
        quadrant: quadrant
    });
}


/**
 * Destroy drone by id
 * @param id
 */
export function destroy(id) {
    return droneStore.remove(id);
}