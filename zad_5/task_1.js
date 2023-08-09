function customFilterUnique(array, property, callback) {
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
    customFilterUnique(array, 'age', (value, index, self) =>
    self.findIndex(item => item.age === value.age) === index)
);