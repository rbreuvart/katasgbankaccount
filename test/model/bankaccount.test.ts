
import BankAccount from '../../src/model/bankaccount';

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = new BankAccount('FR123456789');
  });

  it('should deposit money correctly', () => {
    account.deposit(100);
    expect(account.getHistory().length).toBe(1);
    expect(account.getHistory()[0].amount).toBe(100);
  });

  it('should throw an error when depositing a non-positive amount', () => {
    expect(() => account.deposit(0)).toThrow('Deposit amount must be positive.');
    expect(() => account.deposit(-100)).toThrow('Deposit amount must be positive.');
  });

  it('should withdraw money correctly', () => {
    account.deposit(200);
    account.withdraw(100);
    expect(account.getHistory().length).toBe(2);
    expect(account.getHistory()[1].amount).toBe(-100);
  });

  it('should throw an error when withdrawing a non-positive amount', () => {
    expect(() => account.withdraw(0)).toThrow('Withdrawal amount must be positive.');
    expect(() => account.withdraw(-100)).toThrow('Withdrawal amount must be positive.');
  });

  it('should throw an error when withdrawing more than the balance', () => {
    account.deposit(100);
    expect(() => account.withdraw(200)).toThrow('Insufficient funds.');
  });

  it('should return the correct history', () => {
    account.deposit(100);
    account.withdraw(50);
    const history = account.getHistory();
    expect(history.length).toBe(2);
    expect(history[0].amount).toBe(100);
    expect(history[1].amount).toBe(-50);
  });
});
