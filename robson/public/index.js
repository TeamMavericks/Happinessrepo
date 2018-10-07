var dnperm = document.getElementById('dnperm');
var dndecline = document.getElementById('dndecline');

dnperm.addEventListener('click', function (e) {
	e.preventDefault();

	if (!window.Notification) {
		alert('Sorry, notifications are not supported.');
	} else {
		Notification.requestPermission(function (p) {
			if (p === 'denied') {
				alert('You have denied happiness notifications');
			} else if (p === 'granted') {
				notify = new Notification('Happiness Survey Notification', {
					body: 'Answer your happiness survey.',
					icon: 'images/notification.png'
				});
				// Post credentials of logged in user for server to process
				//This hardcoded code must be removed once the user list is confirmed
				window.open('https://sdm-infs809.slack.com/messages/DC9JYF57X/mentions/', '_blank');
			}
		});
	}
});

//Happiness notifications event
dndecline.addEventListener('click', function (e) {
	var notify;
	e.preventDefault();

	// Post user credentials for processing at server
});