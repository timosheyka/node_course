const product = {
    name: "Laptop",
    getTotalPrice: function (product) {
        if (typeof product !== 'object') {
            throw new Error("Wrong input type. Must be an object");
        }
        return Object.getOwnPropertyDescriptor(product, 'price').value
            * Object.getOwnPropertyDescriptor(product, 'quantity').value;
    },
    deleteNonConfigurable: function(obj, prop) {
        if (typeof obj !== 'object') {
            throw new Error("Wrong input type. Must be an object");
        }
        if (obj.hasOwnProperty(prop)) {
            if (Object.getOwnPropertyDescriptor(obj, prop).configurable) {
                delete obj[prop];
            } else {
                throw new Error("Existing value is non-configurable");
            }
        }
    }
};

Object.defineProperties(product, {
    price: {
        value: 1000,
        enumerable: false,
        writable: false,
    },
    quantity: {
        value: 5,
        enumerable: false,
        writable: false,
    }
})

console.log(product.getTotalPrice(product));
console.log(product.name);
product.deleteNonConfigurable(product, 'name');
console.log(product.name);
//product.deleteNonConfigurable(product, 'price'); // throws an error