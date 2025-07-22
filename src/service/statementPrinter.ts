import BankAccount from "../model/account";

class StatementPrinter{

    public static printStatement(account: BankAccount): String {
        if (!account) {
            throw new Error('Account not found.');
        }
        const history = account.getHistory();
        let lines = '';
        for (const transaction of history) {
            let line = `Date: ${transaction.date}, Amount: ${transaction.amount}, Balance: ${transaction.balance}`;
            console.log(line);
            lines += line + '\n';
        }
        return lines;
    }

}

export default StatementPrinter;