import express from "express";
import dotenv from "dotenv";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import "core-js/stable";
import "regenerator-runtime/runtime";
import logColors from "./utils/logColors";

// Import all endpoint routes 

// Startup
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

if (app.get("env") === "production") {
  app.use(compression());
  app.use(morgan("common"));
} else {
  app.use(morgan("dev"));
}

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) throw err;
  console.log(logColors.greenFont + "[node] Server started at " + port);
});

server.on("close", () => {
  console.log(logColors.redFont + "[node] Server stopped", logColors.whiteFont);
  process.exit(1);
});
