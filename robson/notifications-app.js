const Slack = require('slack-node');
const cron = require('node-schedule');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(express.static('public')); //Using  express and direct the app to get information in public folder

app.get('/', onRequest);//app to get request 

// Use actual slack direct channe
var enrolments = GetEnrolments();
var schedules = schedules || [];

app.use(bodyParser.json());
app.post('/schedule_notifications', function(request, response){
	var postData = request.body;
	console.log(postData);
	// Lookup user records and update with recieved response
	var userId = postData.id;
	var userDetails = enrolments[userId];
	
	if(userDetails && !notificationsScheduled())
	{
		// Update with received user response
		var userResponse = postData.userResponse;
		userDetails.lastNotification.userResponse = userResponse;
		console.log(userResponse);

		if(userResponse === 'accepted')
		{
			console.log("User accepted!");
			startScheduler(userDetails.slackTeamWebHook, userDetails.slackChannel, userDetails.userName);
		}
	}
	// Look up user's direct channel provided postData.userResponse === 'accepted'
	// --- schedule notification using direct channel retrieved from user record

	// postData.userResponse === 'rejected'
	console.log(postData.id);
});

// filtering for specific user's schedule - could hook on to user took survey event to cancel reminders
function notificationsScheduled(userName){
	return schedules.filter(s => s.id === userName).length > 0;
}

const hostname = '127.0.0.1';
const portNumber = 8080;

function GetEnrolments() {
	var notification = {
		date: new Date().toUTCString(),
		channel: 'slack',
		userResponse: ''
	};

	var user = {
		slackDirectWebHook: 'https://hooks.slack.com/services/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',
		slackTeamWebHook: 'https://hooks.slack.com/services/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',
		slackChannel: '#howisitnotifications',
		userName: 'Robson',
		email: 'qhs8122@autuni.ac.nz',
		mobile: '0064210593902',
		lastNotification: notification,
		surveyTaken: false
	};
	var enrolments = { user1: user };
	return enrolments;
}

function onRequest (req, res) {
	// 
	res.send(__dirname + "/" + "index.html");
}

// Start the notification scheduler for the registered user identified by id from client call
function startScheduler(slackWebHook, slackChannel, userName){
	var rule = new cron.RecurrenceRule();
	rule.dayOfWeek = [new cron.Range(1, 5)]; //starting Monday to Friday
	rule.hour = [new cron.Range(7, 23)]; //range in hours per day
	rule.minute = [0, 10,19,20,30,40,50]; // minutes 

	console.log("scheduler starting...");

	var j = cron.scheduleJob(rule, function() {
		var slack = new Slack();
		slack.setWebhook(slackWebHook);

		slack.webhook({
			text: 'Answer your Happiness Survey!',
			channel: slackChannel,
			username: userName
		}, function(err, response){
			console.log(new Date() + 'Notification sent to Slack channel.');
			console.log(response);
		});
	});

	// Add scheduled job to collection to allow later cancelling and prevent duplicate schedules for same user
	schedules.push({'id': userName, 'job': j});
}

var server = app.listen(portNumber, function() {
	var host = server.address().address;
		var port = server.address().port;
		console.log("Server listening at http://%s:%s", host, port);
});


// Todo:
// 1. Notification app -server, notification logic, UI, persistence for storing user preferences
// 2. integration points - slack, desktop notification(Mac,Windows, Linux), mobile, sound 
