
import accountService from '../../src/service/account.service';

let comptetest = "FR123456789"

describe('AccountService', () => {
  beforeEach(() => {
    // Reset the accounts map before each test
    accountService['accounts'].clear();
    const defaultAccount = new (require('../../src/model/account').default)(comptetest);
    accountService['accounts'].set(defaultAccount.getAccountNumber(), defaultAccount);
  });
  it('should get an existing account', () => {
    const account = accountService.getAccount(comptetest);
    expect(account).toBeDefined();
    expect(account?.getAccountNumber()).toBe(comptetest);
  });

  it('should return undefined for a non-existing account', () => {
    const account = accountService.getAccount('non-existing');
    expect(account).toBeUndefined();
  });

  it('should deposit money into an existing account', () => {
    accountService.deposit(comptetest, 100);
    const account = accountService.getAccount(comptetest);
    const history = account?.getHistory();
    expect(history?.length).toBe(1);
    expect(history?.[0].amount).toBe(100);
  });

  it('should throw an error when depositing into a non-existing account', () => {
    expect(() => accountService.deposit('non-existing', 100)).toThrow('Account not found.');
  });

  it('should withdraw money from an existing account', () => {
    accountService.deposit(comptetest, 200);
    accountService.withdraw(comptetest, 100);
    const account = accountService.getAccount(comptetest);
    const history = account?.getHistory();
    expect(history?.length).toBe(2);
    expect(history?.[1].amount).toBe(-100);
  });

  it('should throw an error when withdrawing from a non-existing account', () => {
    expect(() => accountService.withdraw('non-existing', 100)).toThrow('Account not found.');
  });

  it('should get the history of an existing account', () => {
    accountService.deposit(comptetest, 100);
    const history = accountService.getHistory(comptetest);
    expect(history.length).toBe(1);
  });

  it('should throw an error when getting the history of a non-existing account', () => {
    expect(() => accountService.getHistory('non-existing')).toThrow('Account not found.');
  });
});
