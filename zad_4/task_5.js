function observeObject(object, callback) {
    if (typeof object !== 'object' || object === null) {
        throw new Error("Wrong input type. Must be an object");
    }
    if (typeof callback !== 'function') {
        throw new Error("Wrong input type. Must be a function");
    }
    return new Proxy(object, {
        get(target, prop) {
            const value = target[prop];
            console.log(`Accessed ${prop}`);
            return value;
        },
        set(target, prop, value) {
            console.log(`Modified ${prop}, from ${target[prop]} to ${value}`);
            target[prop] = value;
            return true;
        }
    });
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

observedObject.name;
observedObject.age = 31;