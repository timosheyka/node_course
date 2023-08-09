function customShuffle_1(array) {
    return array.slice().sort(() => Math.random() - 0.5); 
}

// the Fisher-Yates algorithm
function customShuffle_2(array) {
    const new_array = array.slice();
    for (let i = new_array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [new_array[i], new_array[j]] = [new_array[j], new_array[i]];
    }
    return new_array;  
}

const original = [1, 2, 3, 4, 5, 6, 7, 8];

console.log("Original Array:", `[ ${original.join(', ')} ]`);

const shuffled_1 = customShuffle_1(original);
console.log("Shuffled Array 1:", `[ ${shuffled_1.join(', ')} ]`);

const shuffled_2 = customShuffle_2(original);
console.log("Shuffled Array 2:", `[ ${shuffled_2.join(', ')} ]`);

module.exports = { customShuffle_1, customShuffle_2 }