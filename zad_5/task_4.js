function getArrayIntersection(array1, array2) {
    const intersection = [];
    for (const element of array1) {
        if (array2.includes(element)) {
            intersection.push(element);
        }
    }
    return intersection;
}

function getArrayUnion(array1, array2) {
    return Array.from(new Set([...array1, ...array2]));
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

const intersectionArray = getArrayIntersection(array1, array2);
const unionArray = getArrayUnion(array1, array2);

console.log("Array 1:", array1);
console.log("Array 2:", array2);
console.log("Intersection Array:", intersectionArray);
console.log("Union Array:", unionArray);
