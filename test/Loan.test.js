const Loan = require("../src/Loan");

let newLoan;

describe("Loan class unit tests", () => {
  beforeAll(() => {
    const arg = {
      bankName: "IDIDI",
      borrowerName: "Dale",
      principalAmount: 5000,
      years: 1,
      interestRate: 6,
    };
    newLoan = new Loan(arg);
  });

  afterEach(() => {
    newLoan.payments = [];
  });

  test("should construct new object successfully", () => {
    expect(newLoan).toBeDefined();
    expect(newLoan).toEqual({
      key: "IDIDI Dale",
      bankName: "IDIDI",
      borrowerName: "Dale",
      principalAmount: 5000,
      years: 1,
      interestRate: 0.06,
      totalAmount: 5300,
      payments: [],
    });
  });

  test("should calculate totalInterest correctly", () => {
    expect(newLoan.totalInterest).toEqual(300);
  });

  test("should calculate numberOfEmis correctly", () => {
    expect(newLoan.numberOfEmis).toEqual(12);
  });

  test("should calculate emiAmount correctly", () => {
    expect(newLoan.emiAmount).toEqual(442);
  });

  test("should calculate amountPaid correctly if emiNumber is provided", () => {
    expect(newLoan.amountPaid(5)).toEqual(2210);
    expect(newLoan.amountPaid(11)).toEqual(4862);
    expect(newLoan.amountPaid(12)).toEqual(5300);
    expect(newLoan.amountPaid(50)).toEqual(5300);
  });

  test("should calculate remainingAmount correctly if emiNumber is provided", () => {
    expect(newLoan.remainingAmount(5)).toEqual(3090);
    expect(newLoan.remainingAmount(11)).toEqual(438);
    expect(newLoan.remainingAmount(12)).toEqual(0);

    newLoan.payments.push({
      emiNumber: 2,
      lumSumAmount: 1000,
    });
    expect(newLoan.remainingAmount(5)).toEqual(2090);
  });

  test("should calculate remainingEmis correctly if emiNumber is provided", () => {
    expect(newLoan.remainingEmis(5)).toEqual(7);
    expect(newLoan.remainingEmis(11)).toEqual(1);

    newLoan.payments.push({
      emiNumber: 2,
      lumSumAmount: 1000,
    });
    expect(newLoan.remainingEmis(3)).toEqual(7);
  });

  test("should return correct payments information if any payments are done", () => {
    newLoan.payments.push({
      emiNumber: 2,
      lumSumAmount: 1000,
    });
    expect(newLoan.paymentsBy(5)).toEqual([
      { emiNumber: 2, lumSumAmount: 1000 },
    ]);
    expect(newLoan.lumSumAmountPaid(5)).toEqual(1000);

    newLoan.payments.push({
      emiNumber: 5,
      lumSumAmount: 2000,
    });
    expect(newLoan.paymentsBy(5)).toEqual([
      { emiNumber: 2, lumSumAmount: 1000 },
      {
        emiNumber: 5,
        lumSumAmount: 2000,
      },
    ]);
    expect(newLoan.lumSumAmountPaid(5)).toEqual(3000);
  });

  test("should return balanceOutput correctly with and without payments", () => {
    expect(newLoan.balanceOutput(5)).toEqual("IDIDI Dale 2210 7");

    newLoan.payments.push({
      emiNumber: 2,
      lumSumAmount: 1000,
    });
    expect(newLoan.balanceOutput(3)).toEqual("IDIDI Dale 2326 7");
  });
});
