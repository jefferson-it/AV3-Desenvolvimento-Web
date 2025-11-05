
/**
 * @template T
 * 
 * @param {Array<T>} input 
 * @returns {Array<T>}
 */
export function shuffleData(input) {
    for (let i = input.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [input[i], input[j]] = [input[j], input[i]];
    }

    return input;
}