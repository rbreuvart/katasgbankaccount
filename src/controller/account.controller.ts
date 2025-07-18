
import { Request, Response } from 'express';
import accountService from '../service/account.service';

class AccountController {
  deposit(req: Request, res: Response): void {
    try {
      const { accountNumber } = req.params;
      const { amount } = req.body;
      accountService.deposit(accountNumber, amount);
      res.status(200).send({ message: 'Deposit successful.' });
    } catch (error) { res.status(400).send({ message: (error as Error).message });
    }
  }

  withdraw(req: Request, res: Response): void {
    try {
      const { accountNumber } = req.params;
      const { amount } = req.body;
      accountService.withdraw(accountNumber, amount);
      res.status(200).send({ message: 'Withdrawal successful.' });
    } catch (error) {
      res.status(400).send({ message: (error as Error).message });
    }
  }

  getHistory(req: Request, res: Response): void {
    try {
      const { accountNumber } = req.params;
      const history = accountService.getHistory(accountNumber);
      res.status(200).send(history);
    } catch (error) {
      res.status(400).send({ message: (error as Error).message });
    }
  }
}

export default new AccountController();
