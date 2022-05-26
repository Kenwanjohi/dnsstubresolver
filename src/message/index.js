const Header = require("./header");

class Message {
  constructor(name, type, klass) {
    this.header = new Header();
    this.question = [];
    this.addQuestion(name, type, klass);
  }

  addQuestion(name, type, klass) {
    /**TODO: Add object mapper for codes*/
    if (!type) type = 0; // A
    if (!klass) klass = 1; // IN
    const question = new Question(name, type, klass);
  }
}

module.exports = Message;
