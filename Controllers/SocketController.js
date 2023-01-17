const express = require("express");
const MessagingRouter = express.Router();
const socket = require("socket.io");
const server = require("../app");

// //SOCKET.IO CONFIG
// const io = socket(server);

// io.on("connection", (client) => {
//   // console.log("connected", client.id);
//   //##################

//   //broadcasting message to only a specific user
//   client.emit("message", "Welcome to Fashion5 Customer Care");

//   //broadcasting message when a user connects
//   client.broadcast.emit("message", "A user has joined the group");

//   client.on("disconnect", () => {
//     io.emit("message", "A user has left the group");
//   });

//   //listen for imcoming message from client
//   client.on("chat", (msg) => {
//     console.log(msg);

//     //################################################
//     //show message to everybody
//     client.emit("message", msg);

//     //################################################
//     //show message to only a user
//     io.emit("message", msg);
//   });

//   //##################
//   //broadcasting message to every user
//   // io.emit("event", (data) => {});
//   // io.emit("disconnect", () => {});
//   //##################
// });

//#################################################################################################
//#################################################################################################
//#################################################################################################
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
