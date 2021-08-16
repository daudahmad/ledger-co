const LedgerCo = require("../src/LedgerCo");

let ledgerCo;

describe("LedgerCo class unit tests", () => {
  beforeAll(() => {
    ledgerCo = new LedgerCo();
  });

  test("should construct new object successfully", () => {
    expect(ledgerCo).toBeDefined();
    expect(ledgerCo.loans).toEqual({});
  });

  test("should add new loans successfully", () => {
    ledgerCo.addNewLoan({
      bankName: "IDIDI",
      borrowerName: "Dale",
      principalAmount: 5000,
      years: 1,
      interestRate: 6,
    });
    ledgerCo.addNewLoan({
      bankName: "MBI",
      borrowerName: "Harry",
      principalAmount: 10000,
      years: 3,
      interestRate: 7,
    });

    expect(ledgerCo.loans).toEqual({
      "IDIDI Dale": {
        bankName: "IDIDI",
        borrowerName: "Dale",
        interestRate: 0.06,
        key: "IDIDI Dale",
        payments: [],
        principalAmount: 5000,
        totalAmount: 5300,
        years: 1,
      },
      "MBI Harry": {
        bankName: "MBI",
        borrowerName: "Harry",
        interestRate: 0.07,
        key: "MBI Harry",
        payments: [],
        principalAmount: 10000,
        totalAmount: 12100,
        years: 3,
      },
    });
  });

  test("should printBalance correctly", () => {
    console.log = jest.fn();
    ledgerCo.printBalance("IDIDI Dale", 2);
    expect(console.log.mock.calls[0][0]).toBe("IDIDI Dale 884 10");
  });

  test("should processPayment and update loan payments correctly", () => {
    console.log = jest.fn();
    ledgerCo.processPayment("IDIDI Dale", 2000, 3);
    expect(ledgerCo.loans).toEqual({
      "IDIDI Dale": {
        bankName: "IDIDI",
        borrowerName: "Dale",
        interestRate: 0.06,
        key: "IDIDI Dale",
        payments: [
          {
            emiNumber: 3,
            lumSumAmount: 2000,
          },
        ],
        principalAmount: 5000,
        totalAmount: 5300,
        years: 1,
      },
      "MBI Harry": {
        bankName: "MBI",
        borrowerName: "Harry",
        interestRate: 0.07,
        key: "MBI Harry",
        payments: [],
        principalAmount: 10000,
        totalAmount: 12100,
        years: 3,
      },
    });

    ledgerCo.processPayment("IDIDI Dale", 500, 4);
    ledgerCo.processPayment("MBI Harry", 500, 4);
    expect(ledgerCo.loans).toEqual({
      "IDIDI Dale": {
        bankName: "IDIDI",
        borrowerName: "Dale",
        interestRate: 0.06,
        key: "IDIDI Dale",
        payments: [
          {
            emiNumber: 3,
            lumSumAmount: 2000,
          },
          {
            emiNumber: 4,
            lumSumAmount: 500,
          },
        ],
        principalAmount: 5000,
        totalAmount: 5300,
        years: 1,
      },
      "MBI Harry": {
        bankName: "MBI",
        borrowerName: "Harry",
        interestRate: 0.07,
        key: "MBI Harry",
        payments: [
          {
            emiNumber: 4,
            lumSumAmount: 500,
          },
        ],
        principalAmount: 10000,
        totalAmount: 12100,
        years: 3,
      },
    });
  });
});
