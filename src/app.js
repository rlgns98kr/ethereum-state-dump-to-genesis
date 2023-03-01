import { loadJsonFileSync } from "load-json-file";
import { writeJsonFileSync } from "write-json-file";
import CLI from "cli-flags";

function main() {
  const { flags } = CLI.parse({
    flags: {
      "input-genesis-file": CLI.flags.string({ char: "g", required: true }),
      "input-state-dump-file": CLI.flags.string({ char: "s", required: true }),
      "output-genesis-file": CLI.flags.string({ char: "o", required: true }),
    },
  });

  const inputGenesis = loadJsonFileSync(flags["input-genesis-file"]);
  const inputStateDump = loadJsonFileSync(flags["input-state-dump-file"]);

  const outputAllocData = getAllocData(inputStateDump);
  const outputGenesis = inputGenesis;
  outputGenesis["alloc"] = outputAllocData;

  writeJsonFileSync(flags["output-genesis-file"], outputGenesis);
}

function getAllocData(data) {
  var newData = {};

  const filtered = Object.keys(data.accounts);
  filtered.forEach((accounts_key) => {
    if (!data.accounts[accounts_key]["storage"])
      data.accounts[accounts_key]["storage"] = new Object();

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
