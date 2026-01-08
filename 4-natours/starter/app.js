const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from server side...' });
});
app.post('/', (req, res) => {
    res.status(200).send('Post from server side');
})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

/*
 51 video theory h -- watch again for good knowledgeof API and REST API's 
 and how to make endpoints so that we can handle it for big applicaion
*/
