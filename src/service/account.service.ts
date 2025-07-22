
import BankAccount from '../model/account';
import Transaction from '../model/transaction';

class AccountService {
  private accounts: Map<string, BankAccount> = new Map();

  constructor() {

  }

  getAccount(accountNumber: string): BankAccount | undefined {
    return this.accounts.get(accountNumber);
  }

  deposit(accountNumber: string, amount: number): void {
    const account = this.getAccount(accountNumber);
    if (!account) {
      throw new Error('Account not found.');
    }
    account.deposit(amount);
  }

  withdraw(accountNumber: string, amount: number): void {
    const account = this.getAccount(accountNumber);
    if (!account) {
      throw new Error('Account not found.');
    }
    account.withdraw(amount);
  }

  getHistory(accountNumber: string): Transaction[] {
    const account = this.getAccount(accountNumber);
    if (!account) {
      throw new Error('Account not found.');
    }
    return account.getHistory();
  }

  createAccount(accountNumber: string): BankAccount {
    const newAccount = new BankAccount(accountNumber);
    this.accounts.set(accountNumber, newAccount);
    return newAccount;
  }
}

export default new AccountService();
