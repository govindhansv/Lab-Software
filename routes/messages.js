var express = require('express');
var router = express.Router();
const db = require('../connection');


const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioServiceID = process.env.TWILIO_SERVICE_SID;
// const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);



router.get("/otp", async function (req, res) {
    try {

        client.verify.v2.services(twilioServiceID)
            .verifications
            .create({ to: '+917034598461', channel: 'sms' })
            .then(verification => {
                console.log(verification.accountSid)
                res.send(verification);
            });
    } catch (e) {
        res.send(e);
        console.log(e);
    }

});

router.get("/otp/verify/:otp", async function (req, res) {
    try {

        client.verify.v2.services(twilioServiceID)
            .verificationChecks
            .create({ to: '+917034598461', code: req.params.otp })
            .then(verification => {
                console.log(verification.accountSid)
                res.send(verification);
            });
    } catch (e) {
        res.send(e);
        console.log(e);
    }

});



router.get("/", function (req, res) {
    try {
        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: 'Hello there!',
                to: 'whatsapp:+918921992747'
            })
            .then(message => console.log(message));

    } catch (e) {
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
