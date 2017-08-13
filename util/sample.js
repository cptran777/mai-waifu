/**
 * util/sample.js
 *
 * This file contains the utility functions (mostly used to build responses) for 
 * the sample route of the application
 */
const defaultResponse = {
  speech: 'Hello world',
  displayText: 'Hello wrold',
  data: {},
  contextOut: [],
  source: 'sampleApp'
};

const welcomeHome = () => {
  return {
    speech: ''
  };
};

module.exports = function(data) {

};