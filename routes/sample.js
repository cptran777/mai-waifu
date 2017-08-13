/**
 * routes/sample.js
 *
 * This file contains the setup for the routing for the /api/sample route
 */
'use strict'

module.exports = function(app) {
  app.post('/api/sample', (request, response) => {
    console.log('income request: ');
    console.log(request.body);

    response.json({
      speech: 'Hello world',
      displayText: 'Hello world',
      data: {
        sample: 'Hello darkness my old friend'
      },
      contextOut: [{ name: 'greeting' }],
      source: 'sampleApp'
    });
  });
};