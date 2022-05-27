const { punycode, dec2hex } = require("../utilities/encoder");
MAX_LABEL_LENGTH = 63
MAX_NAME_LENGTH=255
class Question {
  constructor(...args) {
    /**Question name; valiable, the query object/domain */
    this.qname = punycode(args[0]);
    /**Question type; 16-bit, the record for the qname */
    this.qtype = args[1];
    /**Question class; 16-bit, the record class*/
    this.qclass = args[2];
  }
  /**
   * Encodes the Question fields
   * @returns {string} question fields concatenated hexstring
   */
  encode() {
    if(this.qname.length > MAX_NAME_LENGTH ) throw Error `Name too long; Max Length: ${MAX_NAME_LENGTH}`
    let labels = this.qname.split(".")
    let encodedname = ""
    labels.forEach(label => {
      if (label.length > MAX_LABEL_LENGTH) throw Error `Label too long; Max Length: ${MAX_LABEL_LENGTH}`
      encodedname += dec2hex(label.length)
      encodedname += label
    })
    //Question bit
    return encodedname
  }
}

module.exports = Question;
