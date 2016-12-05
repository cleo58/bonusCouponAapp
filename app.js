var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var twilio = require('twilio');


// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Set the port number
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();  // get an instance of the express Router


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// The promotion of bonus coupon router.  
router.route('/sms-promotion')

  // send the phone number  (accessed at POST http://localhost:8080/api/sms-promotion)
  .post(function (req, res, err) {
    // Message of the SMS 
    var message = '';
    // The number send by the user.
    var phoneNumber = req.body.phone;
    // Get current date and time.
    var date = new Date();
    //Get current hour.
    var currentHour = date.getHours();
    //Check if the current time is before miday or midnight.
    var ampm = (currentHour >= 12) ? "PM" : "AM";
    //Check time and send create the appropriate message
    if (ampm == 'PM') {
      message = 'Hello! Your promocode is PM456';
    } else message = 'Good morning! Your promocode is AM123';

    var accountSid = 'AC49574af099ea0405bafc8421a2fbdc65'; // Account SID from www.twilio.com/console
    var authToken = 'b119078ac8f9aeb2605c03e0af72c38c';   //  Auth Token from www.twilio.com/console

    //Create a new Twilio client object  
    var client = new twilio.RestClient(accountSid, authToken);

    client.messages.create({
      body: message,    // the provided message
      to: phoneNumber,  // Text this number
      from: '+12674985067' // From a valid Twilio number
    }, function (error, message) {
      if (error) {
        console.log(error);
        //set the error response from twilio api 
        res.status(error.status).json({
          status: error.status,
          message: error.message
        });


      }
    })
  });

app.listen(port, function () {
  console.log('Example app listening on port 8080')
})