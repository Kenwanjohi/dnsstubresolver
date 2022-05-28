const { punycode } = require("../utilities/encoder");
MAX_LABEL_LENGTH = 63;
MAX_NAME_LENGTH = 255;
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
    if (this.qname.length > MAX_NAME_LENGTH)
      throw Error`Name too long; Max Length: ${MAX_NAME_LENGTH}`;
    let labels = this.qname.split(".");

    let lengthsLabels = [];
    labels.forEach((label) => {
      if (label.length > MAX_LABEL_LENGTH)
        throw Error`Label too long; Max Length: ${MAX_LABEL_LENGTH}`;
      lengthsLabels.push([label.length], label);
    });
    lengthsLabels.push([0]);

    const lengthsLabelsBuf = [];
    lengthsLabels.forEach((item) => {
      lengthsLabelsBuf.push(Buffer.from(item));
    });

    // Well, Maybe there's a better way to do this!!
    const typeClassBuf = Buffer.allocUnsafe(4);
    typeClassBuf.writeUInt16BE(this.qtype, 0);
    typeClassBuf.writeUInt16BE(this.qclass, 2); 

    return Buffer.concat([...lengthsLabelsBuf, typeClassBuf]);
  }
}

module.exports = Question;
