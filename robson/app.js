const http = require('http');
const Slack = require('node-slack');
const cron = require('node-schedule');

const hostname = '127.0.0.1';
const port = 8080;

function onRequest (req, res) {
	res.statusCode = 200;
	res.setHeader('Content-type','text/plain');
	res.end('Happiness Survey Notifications');
}

function startScheduler(){
	var rule = new cron.RecurrenceRule();
	rule.hour = 0.01;
	rule.minute = 0;
	cron.scheduleJob(rule, function() {
		var slack = new Slack('https://hooks.slack.com/services/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');
		slack.send({
			text: 'Answer your Happiness Survey!',
			channel: 'sdm2018_team13'
			//username: 'Robson'
		});
		console.log(new Date(), 'Notification sent to Slack channel.');
	});
}

const server = http.createServer(onRequest, startScheduler);

server.listen(port, hostname, serverStartNotification());

function serverStartNotification(){
	console.log('Server started on port ' + port);
}

// Todo:
// 1. Notification app -server, notification logic, UI, persistence for storing user preferences
// 2. integration points - slack, desktop notification(Mac,Windows, Linux), mobile, sound 
