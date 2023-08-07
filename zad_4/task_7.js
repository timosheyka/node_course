function validateObject(object, schema) {
    if (typeof object !== 'object') { return false; }

    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            const schemaConfig = schema[key];
            const value = object[key];

            if (schemaConfig.required && value === undefined) 
            { return false; }
            if (schemaConfig.type && typeof value !== schemaConfig.type) 
            { return false; }
            if (schemaConfig.validate && !schemaConfig.validate(value))
            { return false; }
        }
    }
    return true;
}

const person = { name: "John", age: 30, email: "john@doe@example.com" };
const personSchema = {
    name: { required: true, type: 'string' },
    age: { required: true, type: 'number' },
    email: { required: true, type: 'string',
        validate: (value) => 
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    }
};

console.log(validateObject(person, personSchema)); // true
