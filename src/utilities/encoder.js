const Punycode = require("punycode/");
/**
 * Returns a Hex string with padding
 * @param {number} i integer
 * @returns {string} Hex string
 */
function dec2hex(i) {
  return i.toString(16).padStart(4, "0").toUpperCase();
}

/**
 * Returns a hex concatenated string
 * @param {number[]} integerArr
 * @returns {string}
 */
function hexify(integerArr) {
  return integerArr.map((integer) => dec2hex(integer)).join("");
}

/**
 * Converts Unicode characters to ASCII; For IDNs
 * @param {string} name
 * @returns A punycode string
 */
function punycode(name) {
  try {
    return Punycode.toASCII(name);
  } catch {
    return name;
  }
}
module.exports = {
  hexify,
  punycode,
};
