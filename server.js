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

/* Server config */
app.set("ipaddr", "127.0.0.1");
app.set("port", 8080);
app.use(express.bodyParser()); //Tells server to support JSON, urlencoded, and multipart requests

/* Server routing */

//Handle route "GET /", as in "http://localhost:8080/"
app.get("/", function(request, response) {
    response.send("Server is up and running");
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    console.log('got here');
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});