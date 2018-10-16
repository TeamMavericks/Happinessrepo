const Slack = require('node-slack');
const cron = require('node-schedule');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(express.static('public')); //Using  express and direct the app to get information in public folder

app.get('/', onRequest);//app to get request 


var notification = {
	date: new Date().toUTCString(),
	channel: 'slack',
	userResponse: ''
};

// Use actual slack direct channel
var user = {
	slackDirectChannel: 'https://hooks.slack.com/services/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',
	slackTeamChannel: 'https://hooks.slack.com/services/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',
	userName: 'Robson',
	email: 'qhs8122@autuni.ac.nz',
	mobile: '0064210593902',
	lastNotification: notification
};

var enrolments = {user1: user};

app.use(bodyParser.json());
app.post('/schedule_notifications', function(request, response){
	var postData = request.body;
	// Lookup user records and update with recieved response
	var userId = postData.id;
	var userDetails = enrolments[userId];
	
	if(userDetails)
	{
		// Update with received user response
		var userResponse = postData.userResponse;
		userDetails.lastNotification.userResponse = userResponse;
		console.log(userResponse);

		if(userResponse === 'accepted')
		{
			console.log("User accepted, scheduler starting...")	
			startScheduler(userDetails.slackDirectChannel, userDetails.userName);
		}
	}
	// Look up user's direct channel provided postData.userResponse === 'accepted'
	// --- schedule notification using direct channel retrieved from user record

	// postData.userResponse === 'rejected'
	console.log(postData.id);
});

const hostname = '127.0.0.1';
const portNumber = 8080;

function onRequest (req, res) {
	// 
	res.send(__dirname + "/" + "index.html");
}

// Start the notification scheduler for the registered user identified by id from client call
function startScheduler(slackChannel, userName){
	var rule = new cron.RecurrenceRule();
	rule.hour = 0.00;
	rule.minute = 2;

	cron.scheduleJob(rule, function() {
		var slack = new Slack('https://hooks.slack.com/services/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');
		slack.send({
			text: 'Answer your Happiness Survey!',
			channel: slackChannel,
			username: userName
		});
		console.log(new Date(), 'Notification sent to Slack channel.');
	});
}

var server = app.listen(portNumber, function() {
	var host = server.address().address;
		var port = server.address().port;
		console.log("Server listening at http://%s:%s", host, port);
});


// Todo:
// 1. Notification app -server, notification logic, UI, persistence for storing user preferences
// 2. integration points - slack, desktop notification(Mac,Windows, Linux), mobile, sound 
