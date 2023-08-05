var express = require('express');
var router = express.Router();
const db = require('../connection');


const accountSid = 'ACaa33b2d02c997e5858a498d0bd686629';
const authToken = '2b92884f3b97c875120cc01233d4b625';
// const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);




    
router.get("/", function (req, res) {
    client.messages
    .create({
        body: 'Your appointment is coming up on July 21 at 3PM',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+918921992747'
    })
    .then(message => console.log(message.sid))
    .done();
    console.log(' Called ');
});

module.exports = router;
