const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log("UNCAUGHT EXCEPTION... Shutting down!");
  console.log(err.name, err.message);
  process.exit(1);
}); 

dotenv.config({ path: './config.env' }); //app file ko require karne se pehele environment variables ko set karlo

const app = require('./app');

console.log('=====> ', app.get('env')); //Ye express batata h konse environment m h
// console.log('---------> ', process.env); //Ye Node batata  h konse environment m h

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then((con) => {
  console.log('DB connection successful!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection... Shutting down!");
  server.close(() => { //ye server ko time det h jo bhi pending req h complete karo, kyuki process.exit() time nahi deta-> ye ekdum band kar deta h(exit kar deta h)
    process.exit(1); //0 for success and 1 for uncaught exception
  })
});
console.log(x);