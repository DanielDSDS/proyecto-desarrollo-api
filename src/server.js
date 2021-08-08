const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
require("core-js/stable");
require("regenerator-runtime/runtime");

const api = require("./api");

// Import all endpoint routes 
const { Careers, Classes, Interactions, Users } = api;

// Startup
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(Careers);
app.use(Classes);
app.use(Interactions);
app.use(Users);

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) throw err;
  console.log("[node] Server started at ");
});

server.on("close", () => {
  console.log("[node] Server stopped");
  process.exit(1);
});
