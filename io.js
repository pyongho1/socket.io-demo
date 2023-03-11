const io = require("socket.io")();

const players = {};

io.on("connection", function (socket) {
  console.log("Client connected to socket.io!");

  socket.on("register-player", function (initials) {
    players[socket.id] = initials;
    io.emit("update-player-list", Object.values(players));
  });

  socket.on("disconnect", function () {
    delete players[socket.id];
    io.emit("update-player-list", Object.values(players));
  });

  socket.on("add-circle", function (data) {
    io.emit("add-circle", data);
  });

  socket.on("clear-circles", function () {
    io.emit("clear-circles");
  });
});

module.exports = io;
