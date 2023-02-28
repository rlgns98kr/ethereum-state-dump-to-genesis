import { loadJsonFile } from "load-json-file";
import CLI from "cli-flags";

async function main() {
  const { flags } = CLI.parse({
    flags: {
      "input-file": CLI.flags.string({ char: "i", required: true }),
      "output-file": CLI.flags.string({ char: "o", required: true }),
    },
  });

  const inputData = await loadJsonFile(flags["input-file"]);
  const outputData = query(inputData);

  console.log(outputData);
}

function query(data) {
  var newData = {};
  const allowed = ["balance", "code", "storage"];

  const filtered = Object.keys(data.accounts);

  filtered.forEach((accounts_key) => {
    Object.keys(data.accounts[accounts_key]).forEach((key) => {
      var tempData;
      switch (key) {
        case "balance":
          tempData = data.accounts[accounts_key][key].padStart(2, 0);
          break;
        case "storage":
          tempData = new Object();
          for (var i in data.accounts[accounts_key][key]) {
            tempData[i] =
              "0x" + data.accounts[accounts_key][key][i].padStart(64, 0);
          }
          break;
        case "code":
          tempData = "0x" + data.accounts[accounts_key][key];
          break;
        default:
          return;
      }

      if (!newData[accounts_key]) newData[accounts_key] = new Object();
      newData[accounts_key][key] = tempData;
    });
  });

  return newData;
}

main();
