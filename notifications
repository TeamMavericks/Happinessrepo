<!doctype html>
<html>
	<head>
		<title> Desktop Happiness Survey Notifications</title>
	</head>
	<body>
		<a href ="#" id="dnperm">Request permision</a>
		<a href ="#" id="dntrigger">Trigger</a>

		<script>
			var dnperm = document.getElementById('dnperm');
			var dntrigger = document.getElementById('dntrigger');

			dnperm.addEventListner('click', function(e){
				e.preventDefault();

				if(!window.Notification) {
					alert('Sorry, notifications are not supported.');
				}else{
					Notification.requestPermission(function(p) {
						console.log(p);
					});
				}
			});
		</script>
	</body>
</html>