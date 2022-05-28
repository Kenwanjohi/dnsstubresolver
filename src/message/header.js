const MAX_ID = 65535;

/**
 * Header section of a DNS Message

            0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
          +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
          |                      ID                       |
          +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
          |QR|   Opcode  |AA|TC|RD|RA| Z|AD|CD|   RCODE   |
          +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
          |                    QDCOUNT                    |
          +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
          |                    ANCOUNT                    |
          +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
          |                    NSCOUNT                    |
          +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
          |                    ARCOUNT                    |
          +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
 */

class Header {
  constructor() {
    /**Identifier: 16-bit device id field */
    this.id = this.generateHeaderId();
    /**Query/Response: 1-bit flag set to 0 for queries and 1 for response by server */
    this.qr = 0;
    /**Operation code: 4-bits the message query type
     * QUERY = 0; Standard query
     * IQUERY = 1; Inverse query; now obsolete? RFC 3425
     * STATUS = 2; Server status request
     * NOTIFY = 4; Notifies secondary servers for zone transfers RFC 1996
     * UPDATE = 5; Automatic RRs updates for dynamic DNS RFC 2136
     */
    this.opcode = 0;
    /**Authoritative answer; 1-bit flag; Tells whether the response is from an Authoritative Server*/
    this.aa = 0;
    /**Truncation: 1-bit flag; Tells whether the message was truncated per the transport mech used i.e UDP*/
    this.tc = 0;
    /**Recursion desired; Whether to resolve recursively if supported */
    this.rd = 1;
    /**Recursion Available; Whether the server supports recursive res*/
    this.ra = 0;
    /**Zero; Reserved; 3bits reserved or are they now? RFC2065 section-6.1*/
    this.z = 0;
    /**Authenticated data; 1-bit whether(in a response) the included data has been verified. RFC2065 section-6.1*/
    this.ad = 0;
    /**Checking disabled; whether(in a query) non-verified data is acceptable RFC2065 section-6.1*/
    this.cd = 0;
    /**Response Code; 4 bits, zero(0) in queries: whether the query was answered successfully*/
    this.rcode = 0;
    /**Question count; 2 bytes, No of questions in question section*/
    this.qdcount = 1;
    /**Answer record count; 2 bytes, No of RRs in Anwer section */
    this.ancount = 0;
    /**Authority record count(Name Server); 2bytes, No of RRs in Authority Section */
    this.nscount = 0;
    /**Additional Record count;  2 bytes, No of RRs in Additional section*/
    this.arcount = 0;
  }

  /**Generate a random 16-bit Integer for Header id field*/
  generateHeaderId() {
    return Math.ceil(Math.random() * MAX_ID);
  }

  /**
   * Encodes the Header fields
   * @returns {string} header fields concatenated hexstring
   */
  encode() {
    let concatQr2Rcode =
      (this.qr << 15) |
      (this.opcode << 11) |
      (this.aa << 10) |
      (this.tc << 9) |
      (this.rd << 8) |
      (this.ra << 7) |
      (this.z << 6) |
      (this.ad << 5) |
      (this.cd << 4) |
      this.rcode;
    let headerFields = [
      this.id,
      concatQr2Rcode,
      this.qdcount,
      this.ancount,
      this.nscount,
      this.arcount,
    ];
    const headerBuf = Buffer.allocUnsafe(12);
    for (let i = 0, j = 0; i < 6; i++, j += 2) {
      headerBuf.writeUInt16BE(headerFields[i], j);
    }

    return headerBuf;
  }
}

module.exports = Header;
