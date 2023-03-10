import express from "express";
import http from "http";
import path from "path";
import { ClientManager } from "./ClientManager";
import { RunManager } from "./RunManager";
// load dotenv
import dotenv from "dotenv";
dotenv.config();

console.log("Starting server...");

const app = express();
const server = http.createServer(app);
const runManager = new RunManager();

runManager.init().then(() => {
	const clientManager = new ClientManager(server, runManager);
	const DIST_DIR = path.join(__dirname, "../../../../dist");
	app.use(express.static(DIST_DIR));

	server.listen(3000, () => {
		console.log("listening on *:3000");
	});
});
