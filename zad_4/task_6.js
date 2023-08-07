function deepCloneObject(object) {
    if (typeof object !== 'object' || object === null) {
        throw new Error("Wrong input type. Must be an object");
    }
    object.itself = object;
    return structuredClone(object);
}

const originalObject = { a: 1, b: { c: 2, d: [3, 4, { e: 5 }] } };
const clonedObject = deepCloneObject(originalObject);

console.log(originalObject);
console.log(clonedObject);

console.log(originalObject === clonedObject); // false
console.log(originalObject.b === clonedObject.b); // false
console.log(originalObject.b.d[2] === clonedObject.b.d[2]); // false