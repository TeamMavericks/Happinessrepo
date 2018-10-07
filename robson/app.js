const Slack = require('node-slack');
const cron = require('node-schedule');
const express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', onRequest);

const hostname = '127.0.0.1';
const portNumber = 8080;

function onRequest (req, res) {
	res.send(__dirname + "/" + "index.html");
}

function startScheduler(){
	var rule = new cron.RecurrenceRule();
	rule.hour = 0.00;
	rule.minute = 2;
	cron.scheduleJob(rule, function() {
		var slack = new Slack('https://sdm-infs809.slack.com/archives/GCANM77HC/p1537402442000100');
		slack.send({
			text: 'Answer your Happiness Survey!',
			channel: 'howisitnotofocations'
			//username: 'Robson'
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
