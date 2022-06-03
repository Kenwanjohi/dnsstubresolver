const Header = require("./header");
const Question = require("./question");
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
  
  encode() {

  }

  decode() {
    
  }
}

module.exports = Message;
