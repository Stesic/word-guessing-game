const { exec } = require("child_process");
const fs = require("fs");

const sourcePath = "6ae48797e0c9:/var/www/assets/dictionary.txt";

// const dictionaryPath =
//   "C:/Users/IvanS/Desktop/zadatak/word-guessing/script/dictio.txt";
const dictionaryPath = "./dictionary.txt";

// const outputFile =
//   "C:/Users/IvanS/Desktop/zadatak/word-guessing/src/data/dictionaryData.ts";

const outputFile = "./dictionaryData.ts";

// Execute the docker cp command
const command = `docker cp ${sourcePath} ${dictionaryPath}`;
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing docker cp command: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Error output from docker cp command: ${stderr}`);
    return;
  }

  console.log(
    `File copied successfully with docker cp command: ${sourcePath} to ${dictionaryPath}`
  );

  fs.readFile(dictionaryPath, "utf8", (error, data) => {
    if (error) {
      console.error(`Error reading the file: ${error.message}`);
      return;
    }

    const lines = data.split("\n");

    // Filter the lines based on the regex pattern
    const filteredLines = lines
      .filter((line) => line.length === 6 && !Number(line))
      .map((line) => `'${line.toLowerCase()}'`);

    const outputData = `export const dictionaryData: string[] = [${filteredLines}]`;
    //   .map((line) => `${line},`);

    fs.writeFile(outputFile, outputData, "utf8", (error) => {
      if (error) {
        console.error(`Error writing the output file: ${error.message}`);
        return;
      }
      console.log("File saved successfully!");
    });
  });
});

// Read the file contents
