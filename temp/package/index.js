let purify;
try {
  const DOMPurify = require("dompurify");
  const { JSDOM } = require("jsdom");
  const window = new JSDOM("").window;
  purify = DOMPurify(window);
} catch (err) {
  purify = null; // fallback if running in browser
}

/**
 * Convert plain text to HTML <ul><li>...</li></ul> (no sanitization)
 */
function toHTML(text, options = {}) {
  if (!text || typeof text !== "string") return "";

  const { bulletPattern = /^(\s*([-*•]|\d+[.)]|[a-zA-Z][.)]))\s+/ } = options;

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletLines = lines
    .filter((line) => bulletPattern.test(line))
    .map((line) => line.replace(bulletPattern, ""))
    .map((line) => `<li>${line}</li>`)
    .join("");

  return `<ul>${bulletLines}</ul>`;
}

/**
 * Convert to sanitized HTML (only works in Node with jsdom)
 */
function toSanitizedHTML(text, options = {}) {
  const html = toHTML(text, options);

  if (!purify) {
    throw new Error(
      "Sanitization not available in this environment. Use `toHTML()` instead."
    );
  }

  return purify.sanitize(html);
}

function textToBullets(text, bulletChar = "-") {
  if (!text || typeof text !== "string") return [];

  const sentences = text
    .split(/\r?\n|(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return sentences.map((s) => `${bulletChar} ${s}`);
}

module.exports = {
  textToBullets,
  toHTML,
  toSanitizedHTML,
};
