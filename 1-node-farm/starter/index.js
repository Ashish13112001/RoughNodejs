const fs = require('node:fs');
const http = require('node:http')

//Read and Write file
const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);

const textOutput = `This is the content of Avacado:  ${textIn} created on ${Date.now()}`;
fs.writeFileSync('./txt/start.txt', textOutput);

///////////////////////////////////

//Create server

const server = http.createServer((req, res) => {
    console.log('--- ', req);
    res.end('Hello from server!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('listen to requests on port 8000');
});
