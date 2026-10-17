/**
 * Fisher-Yates (Knuth) shuffle algorithm.
 * Guarantees uniform, unbiased randomization of arrays.
 * 
 * @template T
 * @param {T[]} array
 * @returns {T[]} A new array with elements in random order
 */
export function shuffleArray(array) {
    if (!Array.isArray(array)) return [];
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
