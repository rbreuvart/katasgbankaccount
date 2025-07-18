
import BankAccount from '../model/bankaccount';
import Movement from '../model/movement';

class AccountService {
  //j'utilise accounts pour remplacer l'utilisation d'une base de données
  private accounts: Map<string, BankAccount> = new Map();

  constructor() {
    // compte par defaut
    const defaultAccount = new BankAccount("FR123456789");
    this.accounts.set(defaultAccount.getAccountNumber(), defaultAccount);
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

  getHistory(accountNumber: string): Movement[] {
    const account = this.getAccount(accountNumber);
    if (!account) {
      throw new Error('Account not found.');
    }
    return account.getHistory();
  }
}

export default new AccountService();
