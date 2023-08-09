function chunkArray_1(array, chunk_size = 3) {
    const chunks = Math.ceil(array.length / chunk_size);
    const result = new Array(chunks);
    for (let i = 0; i < chunks; i++) {
        result[i] = array.slice(i * chunk_size, (i + 1) * chunk_size);
    }
    return result;
}

function chunkArray_2(array, chunk_size) {
    const size = Math.ceil(array.length / chunk_size);
    return Array.from({ length: size }, (value, i) =>
      array.slice(i * chunk_size, (i + 1) * chunk_size)
    );
}

console.log(chunkArray_1([1, 2, 3, 4, 5, 6, 7, 8], 4));
console.log(chunkArray_2([1, 2, 3, 4, 5, 6, 7, 8], 4));

module.exports = { chunkArray_1, chunkArray_2 }