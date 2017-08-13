'use strict'

/******************* INIT DEPENDENCIES *********************/

const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const request = require('request');

const app = express();

/***************** INIT CUSTOM MODULES *********************/

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.json());

app.use((req, res, next) => {
  const token = req.header('mw_access');

  if (token === 'rinbestwaifu') {
    next();
  } else {
    res.send('your waifu is trash');
  }
});

/******************** START  ROUTES ************************/

app.get('/', (request, response) => {
  response.json({ success: 'true' });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log('Listening on port ', port);
});