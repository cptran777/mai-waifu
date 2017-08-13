/**
 * routes/sample.js
 *
 * This file contains the setup for the routing for the /api/sample route
 */
'use strict'
const createResponse = require('../util/sample');

module.exports = function(app) {
  app.post('/api/sample', (request, response) => {
    console.log('income request: ');
    console.log(JSON.stringify(request.body));

    response.json(createResponse(request.body));
  });
};