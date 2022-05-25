/**
 * Returns a Hex string with padding
 * @param {number} i integer
 * @returns {string} Hex string
 */
function dec2hex(i) {
  return i.toString(16).padStart(4, '0').toUpperCase();
}

/**
 * Returns a hex concatenated string
 * @param {number[]} integerArr
 * @returns {string}
 */
function hexify(integerArr) {
  return integerArr.map((integer) => dec2hex(integer)).join("");
}

module.exports = {
  hexify,
};
