const fs = require("fs");
const readline = require("readline");

const { processCommands } = require("./src/commandProcessor");

const filename = process.argv[2];

async function processInputFile() {
  const fileStream = fs.createReadStream(filename);
  const inputCommands = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  await processCommands(inputCommands);
}

processInputFile();
