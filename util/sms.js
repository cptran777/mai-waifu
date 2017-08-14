/**
 * util/sms.js
 * 
 * The sms util handles functions related to sending messages through the twilio service.
 */

/***************************** INIT DEPENDENCIES *****************************/

const { TWILIO_AUTH,
        TWILIO_SID,
        TWILIO_PHONE_NUMBER,
        PERSONAL_PHONE_NUMBER,
        MATT_PHONE_NUMBER } = process.env;

const twilioClient = require('twilio')(TWILIO_SID, TWILIO_AUTH);
// This map is used for determine which number to send the message to
const mapRecipientToNumber = {
  charlie: PERSONAL_PHONE_NUMBER,
  matt: MATT_PHONE_NUMBER
};

/**
 * Given that the received name from Google's voice translator can have variations, the purposes
 * of this function is to try and narrow down to the correct name   
 * @param  {String} name - received name
 * @return {String}      - normalized name
 */
const normalizeName = (name) => {
  // Make everything to lower case:
  name = name.toLowerCase();

  switch (true) {
    case name.includes('matt'):
      return 'matt';

    case name.includes('charlie'):
      return 'charlie';

    default:
      return name;
  }
};

module.exports = {
  /**
   * Uses the twilio client to send a message to the specified recipient by access
   * of the map to their number. If no valid recipient is matched, cancels the
   * operation and returns a falsy value to the caller
   * @param  {String}   recipient - name of the recipient
   * @param  {String}   message   - the actual message to send
   * @param  {Function} resolver  - called after the twilio client returns with success or failure
   * @return {undefined}          - function resolves through the resolver with side effects
   */
  sendMessage(recipient, message, resolver) {
    try {
      const targetNum = mapRecipientToNumber[normalizeName(recipient)];

      if (!targetNum) {
        resolver({ 
          success: false, 
          message: `I could not find the number of ${recipient}`});
        return;
      }

      twilioClient.messages.create({
        from: TWILIO_PHONE_NUMBER,
        to: targetNum,
        body: message
      }, (err, messageObj) => {
        if (err) {
          console.log('sendMessage, twilioClient returned error:');
          console.log(err.message);
          resolver({
            success: false,
            message: err.message
          });
        } else {
          console.log('sendMessage successfully sent a message');
          resolver({ success: true })
        }
      });
    }
    catch (err) {
      console.log('sendMessage caught an error: ');
      console.log(err.message);
    }
  }
};