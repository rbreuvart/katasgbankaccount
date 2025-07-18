import Movement from "./movement";

class BankAccount {
    private accountNumber: string = "FR123456789";
    private balance: number = 0;
    private movements: Movement[] = [];

    constructor(accountNumber: string) {
        this.accountNumber = accountNumber;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive.');
        }
        this.balance += amount;
        this.movements.push({
            accountNumber: this.accountNumber,
            date: new Date(),
            amount: amount,
            balance: this.balance,
        });
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive.');
        }
        if (this.balance < amount) {
            throw new Error('Insufficient funds.');
        }
        this.balance -= amount;
        this.movements.push({
             accountNumber: this.accountNumber,
            date: new Date(),
            amount: -amount,
            balance: this.balance,
        });
    }

    getHistory(): Movement[] {
        return this.movements;
    }

    getAccountNumber(): string {
        return this.accountNumber;
    }
    
}

export default BankAccount;
