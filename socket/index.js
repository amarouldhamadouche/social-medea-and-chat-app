const { Socket } = require("socket.io");

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];
const addUser = (socket, userId) => {
  users = users.filter((u) => u.userId !== userId);
  users.push({ userId, socket });
};
const removeUser = (socket) => {
  users = users.filter((u) => u.socket !== socket);
};
const getReceiverSocket = (receiverId) => {
  return users.find((u) => u.userId === receiverId);
};
io.on("connection", (socket) => {
  console.log("user connecteds");
  socket.on("addUser", (userId) => {
    addUser(socket.id, userId);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const socketId = getReceiverSocket(receiverId);

    io.to(socketId?.socket).emit("getMessage", { senderId, text });
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("user diconnected");
  });
});
