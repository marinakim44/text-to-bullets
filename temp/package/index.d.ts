/**
 * Converts plain text into an array of bullet points.
 * @param text - The input text to convert
 * @param bulletChar - The bullet character to use (e.g., "-", "*", "•")
 * @returns An array of bullet strings
 */
export function textToBullets(text: string, bulletChar?: string): string[];

/**
 * Converts plain text into an HTML <ul><li>...</li></ul> string.
 * NOTE: This version is unsanitized — you may sanitize it yourself in browser apps using DOMPurify.
 * @param text - The input text to convert
 * @param options - Optional bullet pattern
 * @returns HTML string
 */
export function toHTML(
  text: string,
  options?: {
    bulletPattern?: RegExp;
  }
): string;

/**
 * Converts plain text into a sanitized HTML <ul><li>...</li></ul> string.
 * NOTE: This version only works in Node.js environments (requires jsdom).
 * @param text - The input text to convert
 * @param options - Optional bullet pattern
 * @returns Sanitized HTML string
 * @throws Error if used in a browser context
 */
export function toSanitizedHTML(
  text: string,
  options?: {
    bulletPattern?: RegExp;
  }
): string;
