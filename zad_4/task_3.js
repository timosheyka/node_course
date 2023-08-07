const bankAccount = {
    balance: 1000,
    get formattedBalance() {
        return '$' + this.balance;
    },
    set updateBalance(balance) {
        if (typeof balance !== 'number') {
            throw new Error("Wrong input type. Must be a number");
        }
        this.balance = balance;
    },
    transfer: function(acc, amount) {
        if (typeof acc !== 'object') {
            throw new Error("Wrong input type. Must be an object");
        }
        if (typeof amount != 'number') {
            throw new Error("Wrong input type. Must be a number");
        }
        if (this.balance >= amount) {
            this.balance -= amount;
            acc.balance += amount;
        } else {
            throw new Error("Not enough money to transfer");
        }
    }
};

console.log(bankAccount.formattedBalance);
bankAccount.updateBalance = 4000;
console.log(bankAccount.formattedBalance);

const account1 = Object.create(bankAccount);
account1.balance = 3000;

const account2 = Object.create(bankAccount);
account2.balance = 2000;

account1.transfer(account2, 750);
console.log("account 1", account1.formattedBalance);
console.log("account 2", account2.formattedBalance);