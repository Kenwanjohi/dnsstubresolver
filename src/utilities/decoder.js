function getQuestion(buf, offset) {
  buf = Buffer.from(buf, "hex");
  let labels = [];
  while (buf[offset] !== 0) {
    let labelLength = buf[offset];
    let nextLabelStart = offset + labelLength + 1;
    let label = buf.slice(offset + 1, nextLabelStart);
    labels.push(label.toString());
    offset = nextLabelStart;
  }
  offset += 1; // next bytes after root zero byte

  questionfields = {};
  let qfields = ["qtype", "qklass"];

  let index = offset;
  for (let i = index, j = 0; i < index + 4; i += 2, j += 1) {
    questionfields[qfields[j]] = buf.readUInt16BE(i);
    offset += 2;
  }
  console.log({
    offset,
    question: { ...questionfields, qname: labels.join(".") },
  });
  return {
    offset,
    question: { ...questionfields, qname: labels.join(".") },
  };
}

module.exports = {
  getQuestion,
};
