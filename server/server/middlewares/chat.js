const http = require("http");
const server = http.createServer();
const initializeChat = () => {
  const { Server } = require("socket.io");

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  server.listen(process.env.CHAT_PORT, () => {
    console.log("Chat server listening on port 2309!");
  });

  io.on("connection", async (socket) => {
    console.log(JSON.stringify(socket.handshake.query));
    const userId = socket.handshake.query["_id"];
    console.log("User connected: " + userId)
  });
};

module.exports = initializeChat;
