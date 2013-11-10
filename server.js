var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
    response.send('Hello World!');
});

var port = 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});