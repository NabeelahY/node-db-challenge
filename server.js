const express = require("express");

const Routers = require("./projects");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/projects", Routers.projectRoutes);
server.use("/api/actions", Routers.actionRoutes);

module.exports = server;
