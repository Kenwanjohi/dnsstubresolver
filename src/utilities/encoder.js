const Punycode = require("punycode/");

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
  punycode,
};
