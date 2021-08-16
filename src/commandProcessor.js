const LedgerCo = require('./LedgerCo');

const commandTypes = {
  LOAN: "LOAN",
  BALANCE: "BALANCE",
  PAYMENT: "PAYMENT",
};

async function processCommands(inputCommands) {
  const newLedgerCo = new LedgerCo();
  for await (const inputCommand of inputCommands) {
    processCommand(inputCommand, newLedgerCo);
  }
}

function processCommand(inputCommand, newLedgerCo) {
  const commandType = getCommandType(inputCommand);
  switch (commandType) {
    case commandTypes.LOAN:
      processLoan(inputCommand, newLedgerCo);
      break;
    case commandTypes.BALANCE:
      processBalance(inputCommand, newLedgerCo);
      break;
    case commandTypes.PAYMENT:
      processPayment(inputCommand, newLedgerCo);
      break;
    default:
      console.log("invalid input command");
      break;
  }
}

function getCommandType(commandInput) {
  return commandInput.split(" ")[0];
}

function processLoan(inputCommand, newLedgerCo) {
  newLedgerCo.addNewLoan(parseLoanInformation(inputCommand));
}

function processBalance(inputCommand, newLedgerCo) {
  const balanceInput = splitCommandInput(inputCommand);
  newLedgerCo.printBalance(
    loanKey(balanceInput),
    balanceEmiNumber(balanceInput)
  );
}

function processPayment(inputCommand, newLedgerCo) {
  const paymentInput = splitCommandInput(inputCommand);
  newLedgerCo.processPayment(
    loanKey(paymentInput),
    lumpSumAmount(paymentInput),
    paymentEmiNumber(paymentInput)
  );
}

function parseLoanInformation(inputCommand) {
  const loanInput = splitCommandInput(inputCommand);
  return {
    bankName: loanInput[0],
    borrowerName: loanInput[1],
    principalAmount: parseInt(loanInput[2]),
    years: parseInt(loanInput[3]),
    interestRate: parseInt(loanInput[4]),
  };
}

function balanceEmiNumber(balanceInput) {
  return parseInt(balanceInput[2]);
}

function paymentEmiNumber(balanceInput) {
  return parseInt(balanceInput[3]);
}

function lumpSumAmount(balanceInput) {
  return parseInt(balanceInput[2]);
}

function loanKey(balanceInput) {
  return `${balanceInput[0]} ${balanceInput[1]}`;
}

function splitCommandInput(inputCommand) {
  return inputCommand.split(" ").slice(1);
}

module.exports = { processCommands, processCommand };
