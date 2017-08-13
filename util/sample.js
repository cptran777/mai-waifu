/**
 * util/sample.js
 *
 * This file contains the utility functions (mostly used to build responses) for 
 * the sample route of the application
 */

/****************************** INIT  CONSTANTS ******************************/

const defaultResponse = {
  speech: 'I didn\'t get that. Could you try again?',
  displayText: 'I didn\'t get that. Could you try again?',
  data: {},
  contextOut: [],
  source: 'sampleApp'
};

/**
 * Houses constants related to the action names
 * @type {Object}
 */
const ACTIONS = {
  WELCOME_HOME: 'welcome.home'
};

/**
 * Triggered by an action from the google actions in which the user wants to 
 * welcome someone home
 * @param  {String} name - given-name paramter to plug into welcome statement
 * @return {Object}      - object to be returned from the route
 */
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

/**
 * Main export from the file, acts as a function that takes in the request body and
 * based on the given information from the google action will map to the proper
 * function and use that helper function to create a proper response point
 * @param  {Object} data - the request body
 * @return {Object}      - object to be returned from route, that is returned by function
 */
module.exports = function(data) {
  // Safeguard just in case
  data = data || {};
  const actionName = (data.result || {}).action;

  try {
    switch (actionName) {
      case ACTIONS.WELCOME_HOME:
        let paramName = data.result.parameters['given-name'];
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