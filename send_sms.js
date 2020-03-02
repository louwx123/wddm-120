const accountSid = 'AC884e7df64033bb9277e31e4f922964ac';
const authToken = '30dbb86e83da55f9e6508925f0d44e23';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Welcome to AirPnP',
     from: '+14043692027',
     to: '+14169964509'
   })
  .then(message => console.log(message.sid));