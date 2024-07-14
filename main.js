#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.rgb(204, 204, 204)(`\n \t\t <<<======================================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<===============>>>  ${chalk.bold.hex("#9999FF")(`Welcome To 'CodeWithEman' OOP MyBank Project  <<<================>>>`)}`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<======================================================\n`));
// Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.green(`Withdrawal of $${amount} successful. Remaining balance $${this.balance}`));
        }
        else {
            console.log(chalk.red("Insufficient balance."));
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.green(`Deposit of $${amount} successful. New balance $${this.balance}`));
    }
    // Check balance
    checkBalance() {
        console.log(chalk.blue(`Current balance: $${this.balance}`));
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
// Create customers
const customers = [
    new Customer("Hamza", "Khan", "Male", 35, 3162223334, accounts[0]),
    new Customer("Eman", "Iqbal", "Female", 20, 3332223334, accounts[1]),
    new Customer("Aisha", "Ali", "Female", 28, 3412223334, accounts[2])
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: chalk.blue("Enter your account number:")
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.cyan(`Welcome, ${customer.firstName} ${customer.lastName}!\n`));
            console.log(chalk.yellow('<<<-------------------------------------->>>'));
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: chalk.blue("Select an operation:"),
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            });
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.blue("Enter the amount to deposit:")
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.blue("Enter the amount to withdraw:")
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.red("Exiting Bank Program"));
                    console.log(chalk.gray("\nThank you for using our bank services. Have a great day!"));
                    return;
                default:
                    console.log(chalk.red("Invalid option. Please try again."));
            }
            console.log(chalk.yellow('<<<-------------------------------------->>>'));
        }
        else {
            console.log(chalk.red("Invalid account number. Please try again."));
        }
    } while (true);
}
service();
