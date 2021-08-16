const LedgerCo = require("../src/LedgerCo");
const { processCommand } = require("../src/commandProcessor");

let ledgerCo;

describe("processCommand unit tests", () => {
  beforeAll(() => {
    ledgerCo = new LedgerCo();
  });

  test("should process LOAN command successfully", () => {
    processCommand("LOAN IDIDI Dale 10000 5 4", ledgerCo);

    expect(ledgerCo.loans).toEqual({
      "IDIDI Dale": {
        key: "IDIDI Dale",
        bankName: "IDIDI",
        borrowerName: "Dale",
        principalAmount: 10000,
        years: 5,
        interestRate: 0.04,
        totalAmount: 12000,
        payments: [],
      },
    });
  });

  test("should process PAYMENT command successfully", () => {
    processCommand("PAYMENT IDIDI Dale 1000 5", ledgerCo);

    expect(ledgerCo.loans).toEqual({
      "IDIDI Dale": {
        key: "IDIDI Dale",
        bankName: "IDIDI",
        borrowerName: "Dale",
        principalAmount: 10000,
        years: 5,
        interestRate: 0.04,
        totalAmount: 12000,
        payments: [
          {
            emiNumber: 5,
            lumSumAmount: 1000,
          },
        ],
      },
    });
  });

  test("should process BALANCE command and print out the remaining balance successfully", () => {
    console.log = jest.fn();
    processCommand("BALANCE IDIDI Dale 3", ledgerCo);

    expect(console.log.mock.calls[0][0]).toBe("IDIDI Dale 600 57");

    processCommand("PAYMENT IDIDI Dale 1000 5", ledgerCo);
    processCommand("BALANCE IDIDI Dale 10", ledgerCo);
    expect(console.log.mock.calls[1][0]).toBe("IDIDI Dale 4000 40");
  });
});
