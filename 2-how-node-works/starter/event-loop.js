// const EventEmitter = require("node:events");

// const myEvent = new EventEmitter();

// myEvent.on("pop", (data) => {
//   console.log(`you data: ${data.name}`);
// });

// myEvent.emit("pop", { name: "ashish" });

/*
👉 Streams ka matlab hota hai data ko thoda-thoda (chunks me) process karna,
poora data ek saath memory me load karne ke bajay.

❌ Normal way (without streams)
Poora file pehle memory me load hota hai
Phir process hota hai
Large file → memory crash ka risk

✅ Stream way
Thoda data aaya → process kiya
Memory free ki
Phir next chunk aaya

📌 Result:
✔ Kam memory use
✔ Fast processing
*/

// =====================================
//file ek saath load hogi server RAM p load padega
/*
const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  fs.readFile("test-file.txt", (err, data) => {
    if (err) {
      res.statusCode = 500;
      return res.end("File error");
    }

    res.end(data);
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
*/

//SOLUTION 2 – Streams + Events (Better)
/*
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const readable = fs.createReadStream("test-file.txt");

  readable.on("data", (chunk) => {
    res.write(chunk);
  });

  readable.on("end", () => {
    res.end();
  });

  readable.on("error", () => {
    res.statusCode = 500;
    res.end("File not found");
  });
  readable.on("data", (chunk) => {
    console.log("New chunk received:", chunk.length);
    res.write(chunk);
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
*/

//BONUS (TRY THIS TOO) – BEST WAY (pipe)
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
