const fs = require('node:fs');

const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);

const textOutput = `This is the content of Avacado:  ${textIn} created on ${Date.now()}`;
fs.writeFileSync('./txt/start.txt', textOutput);

