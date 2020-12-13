var http = require('http');
var url = require('url');
const { Script } = require('vm');

let Book = [];

var server = new http.Server(function(req, res){
	console.log ( req.headers );
	var urlParsed = url.parse(req.url, true);
	console.log(urlParsed);
	function href(){
		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Book</title>
		</head>
		<body>
		<script>document.location.replace("http://localhost:1337/form")</script>
		</body>
		</html>`
	}
	function getForm(logining, name) {
		let form = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Book</title>
			</head>
			<body>
				<h1>Guest Book</h1>
				<div id='posts'></div>
			`
		let mess1 = '<p>Your name? </p>'
		let mess2 = `<p>Helloy ${name}</p><p>Peregrinus: </p>`
		let users = Book.join('<br>');

		let form2 = `
			<form action='/get' method='get'>
				<input type="text" name="username" placeholder="Name"/><br>
				<input type="submit"/>
			</form>
		`

		let end = `</body></html>`
		if (logining){return form+mess1+form2+end;}
		return form+mess2+users+end;
	}
	if(urlParsed.pathname == '/echo' && urlParsed.query.message){
		res.setHeader('Cache-control', 'no-cache');
		res.setHeader("Set-Cookie", "login=ok-echo");
		res.end(urlParsed.query.message);
	} else if(urlParsed.pathname == '/form') {
		res.setHeader("Set-Cookie", "login+get-successfully-cookie-secretum");
		res.end(getForm(true, undefined));
	} else if (urlParsed.pathname == '/get' && urlParsed.query.username) {
		Book.push(urlParsed.query.username);
		res.end(getForm(false, urlParsed.query.username));
	} else {
		res.statusCode = 404; // Not Found
		res.end("Page not found");
	}
});

server.listen(5005, '127.0.0.1');