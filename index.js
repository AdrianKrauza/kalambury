  var app = require('express')();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var port = process.env.PORT || 3000;
  var players = {};
  app.get('/', function (req, res) {
    // res.sendFile('http://www.adrian.art.8p.pl/str/');
    res.sendFile(__dirname + '/pages/index.html');
  });
  io.on('connection', function (socket) {
    socket.on('disconnect', function () {
      delete players[socket.id]
    });
    socket.on('new player', function (player) {
      players[socket.id] = player;
      io.emit('players', players);
    });
  });
  http.listen(port, function () {
    console.log('listening on *:' + port);
  });