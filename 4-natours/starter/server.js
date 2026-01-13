const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); //app file ko require karne se pehele environment variables ko set karlo

const app = require('./app');

console.log('=====> ', app.get('env')); //Ye express batata h konse environment m h
// console.log('---------> ', process.env); //Ye Node batata  h konse environment m h

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then((con) => {
  console.log('DB connection successful!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
