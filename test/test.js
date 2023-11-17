const pdf = require('../src/index.js');
const fs = require('node:fs');

const filename = process.argv[2];

fs.readFile(filename, (err, buffer) => {
  if (err) {
    console.log(err);
  } else {
    const uint8array = new Uint8Array(buffer);
    pdf.extractText(uint8array).then(console.log);
  }
})
