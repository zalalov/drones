/**
 * Get random int in range(min, max)
 * @param min
 * @param max
 * @returns {number}
 */
export function random(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}