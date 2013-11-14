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

function GameLoop(){
    this._interval = 1000;
    this._timer = null;
}
GameLoop.prototype = {
    init: function(){
        this._timer = setInterval(this._tick, this._interval);
    },
    _tick: function(){
        io.sockets.in('test').emit('news', {'server_time':Date.now(),'room_name':'test'});
        console.log('ticking');
    }

}

var gloop = new GameLoop();
gloop.init();

io.sockets.on('connection', function (socket) {
    //socket.emit('news', { hello: 'world' });
    //console.log('got here');
    socket.join('test');

    /*
     socket.on('my other event', function (data) {
     console.log(data);
     });
     */

});

app.get('/hello.txt', function(req, res){
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

app.get('/testing',function(req, res){
    res.sendfile('Main.html');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});