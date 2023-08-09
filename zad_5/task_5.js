function measureArrayPerformance(fn, array) {
    const start = performance.now();
    fn(array);
    const end = performance.now();
    return end - start;
}

const chunking = require('./task_2');
const shuffle = require('./task_3');

const array = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(
    'Chunking 1 time:', measureArrayPerformance(chunking.chunkArray_1, array).toFixed(3), 
    'Chunking 2 time:', measureArrayPerformance(chunking.chunkArray_2, array).toFixed(3), 
);

console.log(
    'Shuffling 1 time:', measureArrayPerformance(shuffle.customShuffle_1, array).toFixed(3),
    'Shuffling 2 time:', measureArrayPerformance(shuffle.customShuffle_2, array).toFixed(3),
);