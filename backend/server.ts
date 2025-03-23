import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let waitingUsers: Socket[] = [];

io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Add user to queue
    waitingUsers.push(socket);

    // Match users
    if (waitingUsers.length >= 2) {
        const user1 = waitingUsers.shift();
        const user2 = waitingUsers.shift();

        if (user1 && user2) {
            user1.emit("matched", { peerId: user2.id });
            user2.emit("matched", { peerId: user1.id });
        }
    }

    socket.on("disconnect", () => {
        waitingUsers = waitingUsers.filter((user) => user.id !== socket.id);
    });
});

server.listen(3001, () => console.log("Server running on port 3001"));
