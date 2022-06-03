const dgram = require("dgram");
const PORT = 53;
const HOST = "8.8.8.8";

let message = Buffer.from("65d101000001000000000000076578616d706c6503636f6d0000010001", 'hex');
let msg = Buffer.from(
  "111101000001000000000000076578616d706c6503636f6d0000010001",
  "hex"
);
console.log(message)
console.log(msg)
const client = dgram.createSocket("udp4");

client.on("message", function (message, remote) {
  console.log(message);
  client.close()
});

client.bind(3000);

client.send(message, PORT, HOST, function (err, bytes) {
  if (err) {
    console.error(`UDP  error:`, err);
  } else {
    console.log(`UDP  to ${HOST}:${PORT}`);
  }
});
