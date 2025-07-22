import Transaction from "./transaction";

class Statement {
    
    transactions:Transaction[] ;
    constructor() {
        this.transactions = [];
    }

    addTransaction( date: Date, amount: number, balance: number) {
        this.transactions.push({
            date: new Date(),
            amount: amount,
            balance: balance,
        });
    }


    
}

export default Statement;