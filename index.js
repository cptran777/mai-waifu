'use strict'
/***************************** INIT DEPENDENCIES *****************************/
// Load environment variables
require('dotenv').config()
// Node dependencies
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const request = require('request');
// Custom modules
const sampleRoutes = require('./routes/sample');
const sms = require('./routes/sms');
// Create express application, this is our server
const app = express();

/***************** INIT CUSTOM MODULES *********************/

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.json());
// Require this access token 
app.use((req, res, next) => {
  const token = req.header('mw_access');

  if (token === process.env.AUTH_TOKEN) {
    next();
  } else {
    res.send('your waifu is trash');
  }
});

/******************** START  ROUTES ************************/

app.get('/', (request, response) => {
  response.json({ success: 'true' });
});
// Routes related to the sample application
sampleRoutes(app);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log('Listening on port ', port);
});