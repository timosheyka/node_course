function observeObject(object, callback) {
    if (typeof object !== 'object' || object === null) {
        throw new Error("Wrong input type. Must be an object");
    }
    if (typeof callback !== 'function') {
        throw new Error("Wrong input type. Must be a function");
    }

    const observedObject = {};

    for (const prop in object) {
        let propValue = object[prop];
        Object.defineProperty(observedObject, prop, {
            get() {
                console.log(`Accessed ${prop}`);
                return propValue;
            },
            set(newValue) {
                console.log(`Modified ${prop}, from ${propValue} to ${newValue}`);
                propValue = newValue;
            },
            enumerable: true,
            configurable: true
        });
    }

    return observedObject;
}

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

for (const prop in person) {
    Object.defineProperty(person, prop, { writable: false });
}

Object.defineProperty(person, 'addres', {
    value: {}, enumerable: false, configurable: false
})

const observedObject = observeObject(person,
    (message) => { console.log(message); }
);

observedObject.firstName;
observedObject.age = 31;