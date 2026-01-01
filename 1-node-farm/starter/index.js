const fs = require('node:fs');
const http = require('node:http')
const url = require('node:url')

//Read and Write file
const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);

const textOutput = `This is the content of Avacado:  ${textIn} created on ${Date.now()}`;
fs.writeFileSync('./txt/start.txt', textOutput);

///////////////////////////////////

// ye top level code hota h jo 1 baar execute hota h jab server start hota h to agar m data synchronously bhi fetch karta hu to koi problem nahi hogi
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//Create server
// ye vo data h jo baar-baar hit hoga jab bhi server s request aaegi
const server = http.createServer((req, res) => {
    // console.log('--- ', req);
    // console.log('=== ', req.url)
    const pathName = req.url;
    
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is Overview');
    }else if(pathName === '/product'){
        res.end('This is Product'); // end -- used to send back a string
    }else if (pathName === '/api'){
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(data);        
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
