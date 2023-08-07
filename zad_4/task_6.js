function deepCloneObject(object, clones = new Map()) {
    if (typeof object !== 'object' || object === null) {
        return object;
    }
    const clonedObject = {};
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];
            if (typeof value === 'object' && value !== null) {
                clonedObject[key] = Array.isArray(value)
                    ? value.map(item => deepCloneObject(item, clones))
                    : deepCloneObject(value, clones);
            } else {
                clonedObject[key] = value;
            }
        }
    }

    return clonedObject;
}

const originalObject = { a: 1, b: { c: 2, d: [3, 4, { e: 5 }] } };
const clonedObject = deepCloneObject(originalObject);

const util = require('util');
console.log(util.inspect(originalObject, false, null, true));
console.log(util.inspect(clonedObject, false, null, true));

console.log(originalObject === clonedObject); // false
console.log(originalObject.b === clonedObject.b); // false
console.log(originalObject.b.d[2] === clonedObject.b.d[2]); // false