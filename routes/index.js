// ========= ROUTING SETUP =========
// PATH TO FILES
var path = require('path');

// EXPRESS ROUTER SETUP
var express = require('express');
var router = express.Router();

// TODO: MAILGUN SETUP
var api_key = 'key-c50a0e648408c8665034b8004012848f';
var domain = 'sandboxc191221352634d889276e68aa6e0db46.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

// PASSWORDLESS
var passwordless = require('passwordless');
var mailgunDelivery = require( 'passwordless-mailgun-delivery' );
// Pass the below object to passwordless.addDelivery()
mailgunDelivery( {
apiKey: "...",// Your Mailgun API key
html: "<a href=\"verification_url\">Verify</a>",// The HTML to send in the body of the message. The string "verification_url" will be replaced with the url below
sender: "Do Not Reply <donotreply@example.com>",// The email address to send from. This address must end in a domain you have registered with Mailgun
text: "verification_url",// The text to send in the body of the message. The string "verification_url" will be replaced with the url below
url: "https://www..."// The url used to validate the user
} )

// ========= ROUTING DEFINITION =========
// DEFAULT ROUTE
router.get('/', function(req, res){
    console.log('HOME PAGE');
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

//GET LOGIN SCREEN #UNUSUED
router.get('/login', function(req, res) {
  res.render('login', { user: req.user });
});

// GET LOGOUT #UNUSED
router.get('/logout', passwordless.logout(),
	function(req, res) {
  res.redirect('/');
});

// POST LOGIN SCREEN #UNUSUED
router.post('/sendtoken',
	passwordless.requestToken(
		// Simply accept every user
		function(user, delivery, callback) {
			callback(null, user);
		}),
	function(req, res) {
  		res.render('sent');
});

// POST ROUTE #FUNCTIONAL
router.post('/', function(req, res){
    console.log('form submitted : ' + req.body.text);
    if (req.body.text.indexOf('@fake-box.com') <= 0) {
      console.log('invalid mail adress => no action');

    } else {
      console.log('valid mail adress => send mail to adress')

      var data = {
        from: 'Excited User <nemoketchupi@fake-box.com>',
        to: req.body.text,
        subject: 'test',
        text: 'test'
      };

      mailgun.messages().send(data, function (error, body) {
        console.log(error);
        console.log(body);
      });
    }
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

// EXPORT ROUTING
module.exports = router;
