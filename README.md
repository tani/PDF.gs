# PDF.js for Goole Apps Script

## Script ID

```
1wlEYkmDOSGb3Iuqd93a7cbQofcfwg5anjyvYmS3N4-nRAYHED8pVFaTY
```

## Usage

1. Download PDF file with `UrlFetchApp`
2. Convert `HTTPResponse` to `Uint8Array`
3. Extract content from binary with `PdfApp.extractText`

```js
async function myFunction() {
  const result = UrlFetchApp.fetch("https://arxiv.org/pdf/2207.02098.pdf")
  const binary = Uint8Array.from(result.getAs('application/pdf').getBytes())
  console.log(await PdfApp.extractText(binary));
}
```

## License

Apatch Software License

2023 (c) TANIGUCHI Masaya
