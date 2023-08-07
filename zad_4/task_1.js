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
            if (!person.hasOwnProperty(prop)) {
                Object.defineProperty(person, prop, {
                    writable: false,
                    value: new_info[prop],
                })
            }
        });
    }
};

for (const prop in person) {
    Object.defineProperty(person, prop, { writable: false });
}
console.log("Original", person.age, person.firstName,);
person.updateInfo({ 
    firstName: "Jane",
    age: 32,
    height: 185,
    addres: {
        value: {},
        enumerable: false,
        configurable: false
    }
});
console.log("Updated", person.age, person.firstName, person.height, person.addres);