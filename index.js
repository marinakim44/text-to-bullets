const DOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

// Create a DOM window for DOMPurify to use (needed in Node)
const window = new JSDOM("").window;
const purify = DOMPurify(window);

/**
 * Converts plain text into a list of bullet points.
 * @param {string} text - The input text to convert.
 * @param {string} bulletChar - The bullet character to use (default: "-").
 * @returns {string[]} An array of bullet points.
 */
function textToBullets(text, bulletChar = "-") {
  if (!text || typeof text !== "string") return [];

  const sentences = text
    .split(/\r?\n|(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return sentences.map((s) => `${bulletChar} ${s}`);
}

/**
 * Converts plain text into a sanitized HTML <ul> bullet list.
 * @param {string} text - The input text to convert.
 * @returns {string} Sanitized HTML string with <ul><li>...</li></ul>
 */
function toHTML(text, options = {}) {
  if (!text || typeof text !== "string") return "";

  const {
    bulletPattern = /^(\s*([-*•]|\d+[.)]|[a-zA-Z][.)]))\s+/, // smart bullet detection
  } = options;

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletLines = lines
    .filter((line) => bulletPattern.test(line))
    .map((line) => line.replace(bulletPattern, "")) // remove bullet symbol and whitespace
    .map((line) => `<li>${line}</li>`)
    .join("");

  const html = `<ul>${bulletLines}</ul>`;

  return purify.sanitize(html);
}

module.exports = {
  textToBullets,
  toHTML,
};

if (require.main === module) {
  const input = `
  My name is Marina and I'm a Technical Lead at Vidatec. I can support in one of the following areas:
  - web development in React/Next.js
  * mobile development in React Native
  • CV review and job hunting advice
  1. Interview preparation
  a) Portfolio review
  `;

  console.log("\n👉 Sanitized HTML output:\n");
  console.log(toHTML(input));
}
