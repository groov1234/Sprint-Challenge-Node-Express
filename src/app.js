const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const config = require('../config.js')
const PORT = config.PORT;

const app = express();

app.use(bodyParser.json());

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
const endpoint = `/compare`;

app.post(endpoint, (req, res) => {
  if (!req.body.search) {
    res.status(STATUS_SUCCESS);
    res.json({ err: 'No search query provided' });
    return;
  }
  const URL = `https://api.coindesk.com/v1/bpi/historical/close.json`;
  
  let data = null;
  fetch(URL)
    .then(res => res.json())
    .then(json => {
      data = json;
      res.json(data);
    })
    .catch(err => console.log(err));
  res.status(STATUS_SUCCESS);
});

app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`Server Listening on Port ${PORT}`);
  }
});