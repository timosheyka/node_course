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
    Object.defineProperty(person, prop, {
        writable: false
    });
}

Object.defineProperty(person, 'addres', {
    value: {},
    enumerable: false,
    configurable: false
})

console.log("Original", person.age, person.firstName, person.email);
person.updateInfo({ firstName: "Jane", age: 32 });
console.log("Updated", person.age, person.firstName, person.email);