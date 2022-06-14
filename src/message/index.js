const Header = require("./header");
const Question = require("./question");
const { getQuestion } = require("../utilities/decoder");
class Message {
  constructor(name, type, klass) {
    this.header = new Header();
    this.question = [];
    this.addQuestion(name, type, klass);
  }

  addQuestion(name, type, klass) {
    /**TODO: Add object mapper for codes*/
    if (!type) type = 1; // A host adress
    if (!klass) klass = 1; // IN
    const question = new Question(name, type, klass);
    this.question.push(question);
  }

  encode() {}

  decode() {
    let dnsresponse =
      "65d181800001000100000000076578616d706c6503636f6d0000010001c00c000100010000518700045db8d822";
    let resHeader = new Header(dnsresponse);
    const {
      offset,
      question: { qname, qtype, qklass },
    } = getQuestion(dnsresponse, 12);
    const question = new Question(qname, qtype, qklass);
    console.log(question)
    return resHeader;
  }
}

module.exports = Message;
