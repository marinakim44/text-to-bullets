# text-to-bullets

🟢 A tiny JavaScript library to convert plain text into bullet point lists — safely and smartly.

## ✨ Features

- Supports `-`, `*`, `•`, numbered, and lettered bullets
- Converts plain text into HTML `<ul><li>...</li></ul>` format
- Sanitizes output with DOMPurify to prevent XSS
- Lightweight and dependency-friendly

## 📦 Installation

```bash
npm install text-to-bullets
```

## Usage

const { toHTML, textToBullets } = require('text-to-bullets');

const input = `
My name is Marina and I have the following skills:

- Web Development

* React Native

1. AWS
   a) Azure
   `;

console.log(toHTML(input));
// => <ul><li>Web Development</li><li>React Native</li>...</ul>

## Security

Output is sanitized using DOMPurify and jsdom to prevent XSS in browser and server environments.

## License

MIT © Marina Kim
