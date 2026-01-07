const EventEmitter = require("node:events");

const myEvent = new EventEmitter();

myEvent.on("pop", (data) => {
  console.log(`you data: ${data.name}`);
});

myEvent.emit("pop", { name: "ashish" });
