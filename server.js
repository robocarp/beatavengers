/*
 Module dependencies:

 - Express
 - Http (to run Express)

 It is a common practice to name the variables after the module name.
 Ex: http is the "http" module, express is the "express" module, etc.
 */
var express = require("express")
    , app = express()
    , http = require("http").createServer(app)
    , io = require("socket.io").listen(http);

app.get('/hello.txt', function(req, res){
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});