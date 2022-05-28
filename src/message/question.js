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
   * @returns {object} question fields Buffer
   */
  encode() {
    if (this.qname.length > MAX_NAME_LENGTH)
      throw Error`Name too long; Max Length: ${MAX_NAME_LENGTH}`;
    let labels = this.qname.split(".");

    /**
     * DNS Standard Name notation
     * Sequence of label-lengths and label
     * Example: "example.com"
     *          [7]example[3]com[0]
     */
    let lengthsLabels = [];
    labels.forEach((label) => {
      if (label.length > MAX_LABEL_LENGTH)
        throw Error`Label too long; Max Length: ${MAX_LABEL_LENGTH}`;
      lengthsLabels.push([label.length], label);
    });
    /**End of the name; the zero length root */
    lengthsLabels.push([0]);

    /**Encode label-lengths and label characters per byte */
    const lengthsLabelsBuf = [];
    lengthsLabels.forEach((item) => {
      lengthsLabelsBuf.push(Buffer.from(item));
    });

    // Well, Maybe there's a better way to do this!!
    /**Encode qtype and qclass per two bytes */
    const typeClassBuf = Buffer.allocUnsafe(4);
    typeClassBuf.writeUInt16BE(this.qtype, 0);
    typeClassBuf.writeUInt16BE(this.qclass, 2);

    return Buffer.concat([...lengthsLabelsBuf, typeClassBuf]);
  }
}

module.exports = Question;
