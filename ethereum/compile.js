const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

//Everytime you build a script, you will first remove all the old build folder
//and stuff inside of it
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

//Read the Campaign file and get it's path
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

//Recreate the build file folder
fs.ensureDirSync(buildPath);

//console.log(output);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
