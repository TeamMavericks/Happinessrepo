var dnperm = document.getElementById('dnperm');
var dndecline = document.getElementById('dndecline');

dnperm.addEventListener('click', function (e) {
	e.preventDefault();

	if (!window.Notification) {
		alert('Sorry, notifications are not supported.');
	} else {
		Notification.requestPermission(function (p) {
			if (p === 'denied') {
				var userResponse = { "id": "user1", "userResponse": 'rejected' };
				postToServer(userResponse);
				alert('You have denied happiness notifications');
			} else if (p === 'granted') {
				notify = new Notification('Happiness Survey Notification', {
					body: 'Answer your happiness survey.',
					icon: 'images/notification.png'
				});
				// Post credentials of logged in user for server to process
				//This hardcoded code must be removed once the user list is confirmed
				var userResponse = { "id": "user1", "userResponse": 'accepted' };
				postToServer(userResponse);

				//window.open('https://sdm-infs809.slack.com/messages/DC9JYF57X/mentions/', '_blank');
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

function postToServer(userResponse) {
	var xhr = new XMLHttpRequest();
	var url = 'http://127.0.0.1:8080/schedule_notifications';
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			console.log(json);
		}
	};
	var data = JSON.stringify(userResponse);
	xhr.send(data);
}
