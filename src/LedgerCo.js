const Loan = require("./Loan");

class LedgerCo {
  constructor() {
    this.loans = {};
  }

  addNewLoan(loanInformation) {
    const newLoan = new Loan(loanInformation);
    this.loans[newLoan.key] = newLoan;
  }

  printBalance(loanKey, emiNumber = 1) {
    const aLoan = this.loans[loanKey];
    if (aLoan) {
      aLoan.printBalance(emiNumber);
    }
  }

  processPayment(loanKey, lumSumAmount, emiNumber) {
    const aLoan = this.loans[loanKey];
    aLoan.payments.push({
      emiNumber,
      lumSumAmount,
    });
  }
}

module.exports = LedgerCo;
