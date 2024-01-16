const Message = require("../models/message");
//chat controller code for handling message model, messages and user connections
module.exports = (io) => {
  io.on("connection", (client) => {
    console.log("new connection");
    client.on("disconnect", () => {
      client.broadcast.emit("user disconnected");
      console.log("user disconnected");
    });
    client.on("message", (data) => {
      let messageAttributes = {
        content: data.content,
        name: data.userName,
        user: data.userId,
      };
      let m = new Message(messageAttributes);
      m.save()
        .then(() => {
          io.emit("message", messageAttributes);
        })
        .catch((error) => {
          console.log(`error: ${error.message}`);
        });
    });
    Message.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .then((messages) => {
        client.emit("load all messages", messages.reverse());
      });
  });
};
