import express from "express";
import http from "http";
import path from "path";
import { SocketEvent } from "../../shared/SocketEvent";
import { ClientManager } from "./ClientManager";

const app = express();
const server = http.createServer(app);
const clientManager = new ClientManager(server);
// dist dir is located one level up from server dir
const DIST_DIR = path.join(__dirname, "../../../../dist");
console.log(DIST_DIR);
// serve all files in dist
app.use(express.static(DIST_DIR));

server.listen(3000, () => {
	console.log("listening on *:3000");
});

console.log("SO EVENT: " + SocketEvent.Connect);
