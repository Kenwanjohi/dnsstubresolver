const Message = require("./message")
class Resolver {

}
let messageInstance = new Message("EXAMPLE.com")
console.log(messageInstance.header.encode())
console.log("questionBuf",messageInstance.question[0].encode())
// console.log(Buffer.concat(messageInstance.header.encode() + messageInstance.question[0].encode()))
console.log(Buffer.concat([messageInstance.header.encode(), messageInstance.question[0].encode() ]).toString('hex'))
