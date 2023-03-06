import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import path from "path";

import { Server } from "socket.io";
const io = new Server(server);

// dist dir is located one level up from server dir
const DIST_DIR = path.join(__dirname, "../../dist");

// serve all files in dist
app.use(express.static(DIST_DIR));

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});
