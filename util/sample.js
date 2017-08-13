/**
 * util/sample.js
 *
 * This file contains the utility functions (mostly used to build responses) for 
 * the sample route of the application
 */
const defaultResponse = {
  speech: 'I didn\'t get that. Could you try again?',
  displayText: 'I didn\'t get that. Could you try again?',
  data: {},
  contextOut: [],
  source: 'sampleApp'
};

const welcomeHome = (name) => {
  const mytext = `Hello there, ${name}. Welcome home! Hope you've had a good day`;
  return {
    speech: mytext,
    displayText: mytext,
    data: {},
    contextOut: [],
    source: 'sampleApp'
  };
};

module.exports = function(data) {
  // Safeguard just in case
  data = data || {};
  const actionName = (data.result || {}).action;

  try {
    switch (actionName) {
      case 'welcome.home':
        let paramName = data.result.parameters.given-name;
        return welcomeHome(paramName);

      default:
        return defaultResponse;
    }
  }
  catch (err) {
    let mytext = 'Sorry, there was an error in your request. Could you try something else?';
    console.log(err);
    
    return {
      speech: mytext,
      displayText: mytext,
      data: {},
      contextOut: [],
      source: 'sampleApp'
    };
  }
};