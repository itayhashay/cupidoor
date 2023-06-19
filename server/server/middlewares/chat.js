const http = require("http");
// const server = http.createServer();
const chalk = require("chalk");
const { Server } = require("socket.io");
const initializeChat = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  let users = [];

  const addUser = (userId, socketId) => {
    users = users.filter((user) => user.userId !== userId);
    users.push({userId,socketId});
    // !users.some((user) => user.userId === userId) &&
    //   users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", async (socket) => {
    //Retrieve the user id
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    //Handle send and get message
    socket.on("sendMessage", ({ conversationId, senderId, receiver, text }) => {
      const user = getUser(receiver);
      if (!user) {
        console.log(chalk.redBright("Couldn't find user:" + receiver));
        return;
      }
      io.to(user.socketId).emit("getMessage", {
        conversationId,
        sender: senderId,
        text,
      });
    });

    //Handle user disconnect
    socket.on("disconnect", () => {
      console.log(chalk.magenta("A user has disconnected from the chat!"));
      removeUser(socket.id);

      io.emit("getUsers", users);
    });
  });
};

module.exports = initializeChat;
