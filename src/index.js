require('core-js/actual');
global.structuredClone = require('realistic-structured-clone');
global.ReadableStream = require('web-streams-polyfill').ReadableStream;
const pdfjsLib = require('pdfjs-dist/build/pdf.js');

async function extractText(pdf, start = 1, end = undefined) {
  const doc = await pdfjsLib.getDocument({ data: pdf }).promise;
  let text = '';
  for (let i = start; i <= (end ?? doc.numPages); i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(_ => _.str);
    text += strings.join(' ') + ' ';
  }
  return text;
}

global.extractText = extractText;
module.exports = global;
