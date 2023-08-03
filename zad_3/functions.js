/* Task 1: Immutability and Pure Functions */

/* Implement a pure function called calculateDiscountedPrice that takes
an array of products and a discount percentage as arguments. The function
should return a new array of products with discounted prices based on 
the given percentage, without modifying the original products. */
function calculateDiscountedPrice(products, discount) {
    if (!Array.isArray(products)) {
        throw new Error("Wrong input. Must be an array");
    }
    if (typeof discount != 'number') {
        throw new Error("Wrong input. Must be a number");
    }    
    let discountedProducts = [];
    products.forEach((element, index) => {
        discountedProducts[index] =
            (discount === 0) ? element.price :
                element.price * (discount / 100)
    });
    return discountedProducts;
}

/* Create a pure function called calculateTotalPrice that takes an array of products
as an argument. The function should return the total price of all products,
without modifying the original array or its items. */
function calculateTotalPrice(products) {
    if (!Array.isArray(products)) {
        throw new Error("Wrong input. Must be an array");
    }
    let TotalPrice = 0;
    products.forEach(element => { TotalPrice += element.price });
    return TotalPrice;
}

let products = [
    {name: 'potato', price: 100},
    {name: 'cheese', price: 50},
    {name: 'beef', price: 200}
];
console.log(calculateTotalPrice(products));
console.log(calculateTotalPrice([]));
console.log(calculateDiscountedPrice(products, 0));
console.log(calculateDiscountedPrice(products, 70));


/* Task 2: Function Composition and Point-Free Style */

/* Implement a function called getFullName that takes a person object with
firstName and lastName properties. The function should return the person's
full name in the format "FirstName LastName". */
function getFullName(person) {
    if (typeof person != 'object') {
        throw new Error("Wrong input. Must be an object");
    }
    return `${person.firstName} ${person.lastName}.`;
}

/* Create a function called filterUniqueWords that takes a string of text
and returns an array of unique words, sorted in alphabetical order,
without using explicit loops. Use function composition and point-free style. */
function onlyUnique(value, index, array) { return array.indexOf(value) === index; }

function filterUniqueWords(text) {
    if (typeof text != 'string') {
        throw new Error("Wrong input. Must be a string");
    }
    return text.
        toLowerCase().
        split(" ").
        filter(onlyUnique).
        sort((a, b) => a.localeCompare(b));
}

/* Implement a function called getAverageGrade that takes an array
of student objects, each containing a name and grades property.
The function should return the average grade of all students,
without modifying the original array or its items.
Use function composition and point-free style. */
function getAverageGrade(students) {
    if (!Array.isArray(students)) {
        throw new Error("Wrong input. Must be an array of student objects");
    }
    const averageGrade = students.reduce((sum, element) => sum + element.grade, 0);
    return (averageGrade / students.length).toFixed(1);
}

console.log(getFullName({ firstName: "Dan", lastName: "Abramov" }));
console.log(filterUniqueWords("Hella Players Players Club Obla"));
console.log(filterUniqueWords("How HOw to To MAKE make my mY salARy SALary biGGer bigger"));
const students = [
    { name: "Dan", grade: 5.0 },
    { name: "Tim", grade: 4.0 },
    { name: "Sam", grade: 3.0 }
];
console.log(getAverageGrade(students));


/* Task 3: Closures and Higher-Order Functions */

/* Create a function called createCounter that returns a closure.
The closure should be a counter function that increments the count
on each call and returns the updated count.
Each closure should have its own independent count. */
function createCounter() {
    let counter = 0;
    return function count() {
        counter++;
        return counter;
    }
}

const counter1 = createCounter();
const counter2 = createCounter();
for (let i = 0; i < 5; i++) { console.log("first " + counter1()); }
for (let i = 0; i < 3; i++) { console.log("second " + counter2()); }

/* Implement a higher-order function called repeatFunction that takes
a function and a number as arguments. The function should return
a new function that invokes the original function multiple times based on the provided number.
If the number is negative, the new function should invoke the original function indefinitely until stopped. */
function repeatFunction(fn, number) {
    if (typeof fn !== 'function') {
        throw new Error('Wrong input. Must be a function.');
    }
    if (typeof number != 'number') {
        throw new Error("Wrong input. Must be a number");
    }
    return function invoker() {
        if (number < 0) { while (true) { fn(); } }
        else { for (let i = 0; i < number; i++) { fn(); } }
    }
}

function func() { console.log(1); }
repeatFunction(func, 2)();


/* Task 4: Recursion and Tail Call Optimization */

/* Implement a recursive function called calculateFactorial that calculates
the factorial of a given number. Optimize the function to use
tail call optimization to avoid stack overflow for large input numbers. */
function calculateFactorial(number, accumulator = 1) {
    if (typeof number != 'number') {
        throw new Error("Wrong input. Must be a number");
    }
    return (number === 0)
        ? accumulator
        : calculateFactorial(number - 1, number * accumulator);
}
console.log(calculateFactorial(14).toLocaleString());

/* Create a recursive function called power that takes a base and an exponent as arguments.
The function should calculate the power of the base to the exponent using recursion. */
function power(base, exponent) {
    if (typeof base != 'number' || base < 0 || typeof exponent != 'number' || exponent < 0) {
        throw new Error("Wrong input. Must be a number");
    }
    return (exponent === 0) ? 1 : base * power(base, exponent - 1);
}
console.log(power(2, 10));


/* Task 5: Lazy Evaluation and Generators */

/* Implement a lazy evaluation function called lazyMap that takes an array and a mapping function.
The function should return a lazy generator that applies the mapping function to each element of the array one at a time. */
function lazyMap(arr, mapFunc) {
    if (!Array.isArray(arr)) {
        throw new Error("Wrong input. Must be an array");
    }
    if (typeof mapFunc !== 'function') {
        throw new Error('Wrong input. Must be a function.');
    }
    let index = 0;
    return {
        next: function () {
            return index < arr.length
                ? { value: mapFunc(arr[index++]), done: false }
                : { done: true };
        }
    };
}

const numbers = [1, 2, 3];
const lazyMappedNumbers = lazyMap(numbers, (a) => a * a * a);
console.log(lazyMappedNumbers.next().value, lazyMappedNumbers.next().value, lazyMappedNumbers.next().value);

/* Create a lazy generator function called fibonacciGenerator that generates Fibonacci numbers one at a time using lazy evaluation. */
function fibonacciGenerator() {
    let memo = [0n, 1n];
    let index = 0;

    return function () {
        if (index <= 1) {
            return memo[++index - 1];
        } else {
            const nextFib = memo[0] + memo[1];
            memo = [memo[1], nextFib];
            return nextFib;
        }
    };
}

let generateNextFibonacci = fibonacciGenerator();
let generate_10 = Array.from(new Array(10), () => generateNextFibonacci());
console.log(generate_10);