var express = require('express');
var router = express.Router();
const db = require('../connection');


const accountSid = 'ACaa33b2d02c997e5858a498d0bd686629';
const authToken = 'f9666d9008c79d647f0930e248154d74';
// const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);

function SendWhtspSMS(params) {
    
}
    
router.get("/", function (req, res) {
    try{
        client.messages
        .create({
           from: 'whatsapp:+14155238886',
           body: 'Hello there!',
           to: 'whatsapp:+918921992747'
         })
        .then(message => console.log(message));

    }catch(e){
        console.log(e);
    }
   
});
    
// Sand Box messaging
// router.get("/", function (req, res) {
//     try{
//         client.messages
//         .create({
//             body: 'Your appointment is coming up on July 21 at 3PM',
//             from: 'whatsapp:+14155238886',
//             to: 'whatsapp:+917034598461'
//         })
//         .then(message => console.log(message))
//         // .done();
//         console.log(' Called ');
//     }catch(e){
//         console.log(e);
//     }
   
// });

module.exports = router;
