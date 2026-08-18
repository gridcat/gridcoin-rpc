/**
 * Minimal camelCase key transform for JSON-RPC responses.
 */

const LEADING_SEPARATORS = /^[_.\- ]+/;
const TRAILING_SEPARATORS = /[_.\- ]+$/;
const SEPARATOR_BEFORE_ALPHANUMERIC = /[_.\- ]+([a-z\d]|$)/g;
const UPPERCASE_RUN_BEFORE_WORD = /([A-Z]+)([A-Z][a-z]+)/g;
const LOWERCASE_BEFORE_UPPERCASE = /([a-z\d])([A-Z])/g;
const DIGIT_BEFORE_LETTER = /(\d)([a-zA-Z])/g;
const SEPARATOR = /[_.\- ]/;

/**
 * Convert a single key to camelCase
 *
 * Word boundaries: `_`, `-`, `.`, space
 *
 * @param {string} key
 * @returns {string}
 */
export function camelCaseKey(key: string): string {
  const trimmed = key.trim();
  if (trimmed.length < 2) {
    return trimmed.toLowerCase();
  }
  const stripped = trimmed
    .replace(LEADING_SEPARATORS, '')
    .replace(TRAILING_SEPARATORS, '');
  if (stripped.length === 0) {
    return stripped;
  }
  return stripped
    .replace(UPPERCASE_RUN_BEFORE_WORD, '$1-$2')
    .replace(LOWERCASE_BEFORE_UPPERCASE, '$1-$2')
    .replace(DIGIT_BEFORE_LETTER, '$1-$2')
    .toLowerCase()
    .replace(SEPARATOR_BEFORE_ALPHANUMERIC, (_match, character: string) => character.toUpperCase());
}

/**
 * Convert a key, exlcude values from the exclusion list
 *
 * @param {string} key
 * @param {ReadonlyArray<string>} exclude
 * @returns {string}
 */
function convertKey(key: string, exclude: readonly string[]): string {
  if (exclude.indexOf(key) !== -1) {
    return key;
  }
  for (let i = 0; i < exclude.length; i += 1) {
    const token = exclude[i];
    if (key.length > token.length
      && key.slice(0, token.length) === token
      && SEPARATOR.test(key.charAt(token.length))) {
      const rest = camelCaseKey(key.slice(token.length));
      if (rest.length > 0) {
        return token + rest.charAt(0).toUpperCase() + rest.slice(1);
      }
    }
  }
  return camelCaseKey(key);
}

/**
 * Whether a value should have its keys walked
 *
 * @param {unknown} value
 * @returns {boolean}
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Recursively convert every key of a JSON-RPC response to camelCase
 *
 * @template T
 * @param {unknown} value
 * @param {ReadonlyArray<string>} [exclude] keys to leave exactly as they are
 * @returns {T}
 */
export function camelCaseKeys<T>(value: unknown, exclude: readonly string[] = []): T {
  if (Array.isArray(value)) {
    return value.map((item) => camelCaseKeys(item, exclude)) as unknown as T;
  }
  if (!isPlainObject(value)) {
    return value as T;
  }
  const result: Record<string, unknown> = {};
  Object.keys(value).forEach((key) => {
    result[convertKey(key, exclude)] = camelCaseKeys(value[key], exclude);
  });
  return result as unknown as T;
}

export default camelCaseKeys;
