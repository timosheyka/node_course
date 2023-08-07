const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    updateInfo: function (new_info) {
        if (typeof new_info !== 'object') {
            throw new Error("Wrong input type. Must be an object");
        }
        Object.keys(new_info).forEach(prop => {
            if (person.hasOwnProperty(prop)) {
                Object.defineProperty(person, prop, {
                    writable: false,
                    configurable: true,
                    value: new_info[prop],
                })
            }
        });
    }
};

function createImmutableObject(object) {
    if (typeof object !== 'object' || object === null) {
        throw new Error("Wrong input type. Must be an object");
    }
    const immutableObject = {};
    for (const prop in object) {
        if (object.hasOwnProperty(prop)) {
            const descriptor = Object.getOwnPropertyDescriptor(object, prop);
            descriptor.configurable = false;
            descriptor.writable = false;
            if (descriptor.value != null && typeof descriptor.value === 'object') {
                descriptor.value = createImmutableObject(descriptor.value);
            }
            Object.defineProperty(immutableObject, prop, descriptor);
        }
    }
    return immutableObject;
}

const object = { a: 1, b: { c: 2, d: [3, 4, 5] } };
const immutableObject = createImmutableObject(object);
immutableObject.a = 100;
immutableObject.b.c = 200;
console.log(immutableObject);

const immutableObjectPerson = createImmutableObject(person);
immutableObject.age = 42;
console.log(immutableObjectPerson);