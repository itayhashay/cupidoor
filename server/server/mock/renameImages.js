const fs = require("fs");

const directory = "./house_data"; // Specify the directory where the files are located
const filePattern = /living_(\d+)\.jpg/; // Regex pattern to match the file names

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  let count = 1; // Starting number for renaming

  const bootstrap = async () => {
   files = files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    
    for (let file of files) {
      const matches = file.match(filePattern);
      if (matches) {
        const newFilename = file.replace(filePattern, `living_${count}.jpg`);
        const currentPath = `${directory}/${file}`;
        const newPath = `${directory}/${newFilename}`;
        try {
          const response = fs.renameSync(currentPath, newPath);
        //   console.log(`Renamed ${file} to ${newFilename}`);
          count++;
        } catch (ex) {
          console.error(`Error renaming file ${file}:`, err);
        }
      }
    }
  };
  bootstrap();

  //   files.forEach((file) => {
  //     const matches = file.match(filePattern);

  //     if (matches && matches.length > 1) {
  //       const currentNumber = parseInt(matches[1], 10);
  //       const newFilename = file.replace(filePattern, `bath_${count}.jpg`);
  //       const currentPath = `${directory}/${file}`;
  //       const newPath = `${directory}/${newFilename}`;

  //       fs.rename(currentPath, newPath, (err) => {
  //         if (err) {
  //           console.error(`Error renaming file ${file}:`, err);
  //         } else {
  //           console.log(`Renamed ${file} to ${newFilename}`);
  //         }
  //       });

  //       count++;
  //     }
  //   });
});
