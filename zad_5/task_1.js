function customFilterUnique_1(array, property, callback) {
    return array
        .filter(callback)
        .filter(
            (value, index, self) =>
            self.findIndex(
                item => item[property] === value[property]
            ) === index
        );
}

const array = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 },
    { name: 'David', age: 30 }
];

console.log(
    customFilterUnique_1(array, 'age', (value, index, self) =>
    self.findIndex(item => item.age === value.age) === index)
);

function customFilterUnique_2(array, callback) {
    return array.filter(callback);
}

console.log(customFilterUnique_2([1,2,3,4,5,6,7,8], (x) => x > 3));