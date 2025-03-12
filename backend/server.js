const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("../public")); // Serve frontend files

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("chatMessage", (data) => {
        io.emit("chatMessage", { id: socket.id, msg: data.msg });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
