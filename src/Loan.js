class Loan {
  constructor({
    bankName,
    borrowerName,
    principalAmount,
    years,
    interestRate,
  }) {
    this.key = `${bankName} ${borrowerName}`;
    this.bankName = bankName;
    this.borrowerName = borrowerName;
    this.principalAmount = principalAmount;
    this.years = years;
    this.interestRate = interestRate / 100;
    this.totalAmount = this.principalAmount + this.totalInterest;
    this.payments = [];
  }

  get totalInterest() {
    return this.principalAmount * this.years * this.interestRate;
  }

  get numberOfEmis() {
    return Math.ceil(this.years * 12);
  }

  get emiAmount() {
    return Math.ceil(this.totalAmount / this.numberOfEmis);
  }

  amountPaid(emiNumber) {
    if (emiNumber > this.numberOfEmis) {
      return this.totalAmount;
    }

    const amountPaid =
      this.emiAmount * emiNumber + this.lumSumAmountPaid(emiNumber);
    if (amountPaid > this.totalAmount) return this.totalAmount;

    return amountPaid;
  }

  remainingAmount(emiNumber) {
    const remainingAmount = this.totalAmount - this.amountPaid(emiNumber);
    return remainingAmount > -1 ? remainingAmount : 0;
  }

  remainingEmis(emiNumber) {
    return Math.ceil(this.remainingAmount(emiNumber) / this.emiAmount);
  }

  paymentsBy(emiNumber) {
    return this.payments.filter((payment) => emiNumber >= payment.emiNumber);
  }

  lumSumAmountPaid(emiNumber) {
    const payments = this.paymentsBy(emiNumber);
    return payments.reduce((acc, cur) => acc + cur.lumSumAmount, 0);
  }

  printBalance(emiNumber) {
    console.log(this.balanceOutput(emiNumber));
  }

  balanceOutput(emiNumber) {
    let amountPaid = this.amountPaid(emiNumber);
    if (amountPaid >= this.totalAmount) {
      amountPaid = this.totalAmount;
    }
    const remainingEmis = this.remainingEmis(emiNumber);

    return `${this.bankName} ${this.borrowerName} ${amountPaid} ${remainingEmis}`;
  }
}

module.exports = Loan;
