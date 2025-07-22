import Statement from "./statement";
import Transaction from "./transaction";

class BankAccount {
    private accountNumber: string = "";
    private balance: number = 0;
    private statement: Statement ;

    constructor(accountNumber: string) {
        this.accountNumber = accountNumber;
        this.statement = new Statement();
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive.');
        }
        this.balance += amount;
        this.statement.addTransaction(new Date(),amount,this.balance );
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive.');
        }
        if (this.balance < amount) {
            throw new Error('Insufficient funds.');
        }
        this.balance -= amount;
        this.statement.addTransaction(new Date(),-amount,this.balance );
    }

    getHistory(): Transaction[] {
        return this.statement.transactions;
    }

    getAccountNumber(): string {
        return this.accountNumber;
    }
    
}

export default BankAccount;
