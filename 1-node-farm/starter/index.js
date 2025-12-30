const fs = require('node:fs');
const http = require('node:http')
const url = require('node:url')

//Read and Write file
const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);

const textOutput = `This is the content of Avacado:  ${textIn} created on ${Date.now()}`;
fs.writeFileSync('./txt/start.txt', textOutput);

///////////////////////////////////

//Create server

const server = http.createServer((req, res) => {
    // console.log('--- ', req);
    // console.log('=== ', req.url)
    const pathName = req.url;
    
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is Overview');
    }else if(pathName === '/product'){
        res.end('This is Product');
    }else{
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1> page not found </h1>');
    }
    
});

server.listen(8000, '127.0.0.1', () => {
    console.log('listen to requests on port 8000');
});
