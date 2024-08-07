const { test } = require('node:test');

const filename = process.argv[2];

const fs = require('node:fs').promises;
const assert = require('node:assert');
const pdf = require('../src/index.js');

async function getPdfBuffer(filename) {
  const buffer = await fs.readFile(filename);
  return new Uint8Array(buffer);
}

function generateExpectedText(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => `page ${start + i} `).join('');
}

test('PDF text extraction for multiple page ranges', async () => {
  const uint8array = await getPdfBuffer(filename);

  for (let start = 1; start <= 4; start++) {
    for (let end = start; end <= 4; end++) {
      const actual = await pdf.extractText(uint8array, start, end);
      const expected = generateExpectedText(start, end);
      assert.strictEqual(actual, expected);
    }
  }
});

test('PDF text extraction for single page ranges', async () => {
  const uint8array = await getPdfBuffer(filename);

  for (let start = 1; start <= 4; start++) {
    const end = 4;
    const actual = await pdf.extractText(uint8array, start);
    const expected = generateExpectedText(start, end);
    assert.strictEqual(actual, expected);
  }
});

test('PDF text extraction for entire document', async () => {
  const uint8array = await getPdfBuffer(filename);
  const start = 1;
  const end = 4;
  const actual = await pdf.extractText(uint8array);
  const expected = generateExpectedText(start, end);
  assert.strictEqual(actual, expected);
});
