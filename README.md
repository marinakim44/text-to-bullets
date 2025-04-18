# text-to-bullets

🟢 A tiny, framework-agnostic JavaScript utility that converts plain text into bullet point lists — safely and smartly.

## ✨ Features

- Parses `-`, `*`, `•`, numbered (`1.`), and lettered (`a)`) lists
- Converts plain text into `<ul><li>...</li></ul>` HTML
- Optional sanitization using DOMPurify + jsdom (Node-only)
- Tailwind-compatible output (see [Tailwind Note](#tailwind-note))
- TypeScript support included
- Lightweight, fast, and dependency-friendly

## 📦 Installation

```bash
npm install text-to-bullets
```

## 🔧 Usage

### Basic (HTML conversion)

```js
import { toHTML } from "text-to-bullets";

const input = `
My name is Marina and I have the following skills:

- Web Development
* React Native
1. AWS
a) Azure
`;

console.log(toHTML(input));
// => "<ul><li>Web Development</li><li>React Native</li><li>AWS</li><li>Azure</li></ul>"
```

### React (with dangerouslySetInnerHTML)

```tsx
<div dangerouslySetInnerHTML={{ __html: toHTML(text) }} />
```

💡 For security, you may sanitize the output in browser apps using [DOMPurify](https://github.com/cure53/DOMPurify):

```tsx
import DOMPurify from "dompurify";
const safeHtml = DOMPurify.sanitize(toHTML(text));
```

## 🧼 Server-side Sanitization

```js
import { toSanitizedHTML } from "text-to-bullets";

const cleanHtml = toSanitizedHTML(input);
// Uses jsdom + DOMPurify under the hood
```

## 🧠 Tailwind Note

Tailwind CSS resets list styles by default. To display bullet points properly:

### Option 1: Apply global styles

```css
/* global.css */
ul {
  @apply list-disc pl-6;
}
```

### Option 2: Use the Typography plugin

```bash
npm install @tailwindcss/typography
```

```js
// tailwind.config.js
plugins: [require('@tailwindcss/typography')],
```

```tsx
<div className="prose" dangerouslySetInnerHTML={{ __html: toHTML(text) }} />
```

## 📘 TypeScript Support

This package includes full TypeScript declarations:

```ts
toHTML(text: string, options?: { bulletPattern?: RegExp }): string;
textToBullets(text: string, bulletChar?: string): string[];
toSanitizedHTML(text: string, options?: { bulletPattern?: RegExp }): string;
```

## 🛣 Roadmap

- [ ] Nested list support
- [ ] Markdown parser mode
- [ ] React component wrapper (`text-to-bullets-react`)
- [ ] CLI tool
- [ ] AI powered

## 🛡 Security

- `toSanitizedHTML()` sanitizes output using DOMPurify and jsdom (Node only)
- `toHTML()` is safe by default for plain text input, but does not sanitize
- In browsers, use DOMPurify to sanitize if output is dynamic or user-generated

## 📄 License

MIT © [Marina Kim](https://github.com/YOUR_GITHUB_USERNAME)
