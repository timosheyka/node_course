class Book {
    constructor(title, author, isbn, price, availability) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price;
        this.availability = availability;
    }

    isAvailable() {
        return this.availability > 0;
    }
}

class FictionBook extends Book {
    constructor(title, author, isbn, price, availability) {
        super(title, author, isbn, price, availability);
        this.genre = "Fiction";
    }
}

class NonFictionBook extends Book {
    constructor(title, author, isbn, price, availability) {
        super(title, author, isbn, price, availability);
        this.genre = "Non-Fiction";
    }
}
  
class User {
    constructor(name, email, userId) {
        this.name = name;
        this.email = email;
        this.userId = userId;
        this.cart = new Cart(this);
    }

    addToCart(book) {
        const existingItem = this.cart.items.find((item) => item.book === book);
        if (existingItem) { existingItem.quantity++; }
        else { this.cart.items.push({ book, quantity: 1 }); }
    }

    removeFromCart(book) {
        const index = this.cart.items.findIndex((item) => item.book === book);
        if (index !== -1 && --this.cart.items[index].quantity === 0) {
            this.cart.items.splice(index, 1);
        } else { console.log('Cannot remove a non-existing book from the cart.'); }
    }

    createAnOrder(books) {
        new Order(this, books).placeAnOrder();
    }
}

class Cart {
    constructor(user) {
        this.user = user;
        this.items = [];
    }

    showCart() {
        if (this.items.length === 0) {
            console.log('Your cart is empty.');
        } else {
            console.log(`Items in ${this.user.name}'s cart:`);
            this.items.forEach((item) => {
                console.log(`"${item.book.title}" x${item.quantity} - price: "$${item.quantity * item.book.price}"`);
            });
        }
    }

    calculateTotalPrice() {
        return this.items.reduce((total, item) => {
                return total + item.quantity * item.book.price;
        }, 0);
    }
}

class Order {
    constructor(user, books) {
        this.user = user;
        this.totalPrice = books.reduce((total, item) => {
            return total + item.price; }, 0);
        this.order = books.map(book => `${book.title} - $${book.price} `);
    }

    placeAnOrder() {
        console.log(`${this.user.name} want's to buy ${this.order}for $${this.totalPrice}`);
    }
}

const book1 = new FictionBook("Book 1", "Author 1", "isbn1", 9.99, true);
const book2 = new NonFictionBook("Book 2", "Author 2", "isbn2", 4.99, true);
const book3 = new NonFictionBook("Book 3", "Author 3", "isbn3", 8.99, true);

const user1 = new User("Timmy", "timosheyka@gmail.com", 439668);
const user2 = new User("Ivan", "chai@gmail.com", 442222);

user1.addToCart(book1);
user1.addToCart(book2);
user1.addToCart(book2);
user1.addToCart(book3);
user1.cart.showCart();
console.log(`${user1.name}'s cart has ${user1.cart.calculateTotalPrice()}$`);

user2.addToCart(book2);
user2.addToCart(book3);
user2.addToCart(book3);
user2.cart.showCart();
console.log(`${user2.name}'s cart has ${user2.cart.calculateTotalPrice()}$`);

user1.removeFromCart(book2);
user1.cart.showCart();

user1.createAnOrder([book1, book2]);
user2.createAnOrder([book2, book3]);