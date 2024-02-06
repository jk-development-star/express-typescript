import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import AuthorRoutes from "./routes/Author";
import { errorHandler } from "./middleware/errorHandler";
import createHttpError from "http-errors";

const app = express();

/** Connect database */
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    Logging.info("Connected to MongoDB.");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Unable to connect");
    Logging.error(error);
  });

/** Only start the server if connected to MongoDB */
const StartServer = () => {
  app.use((req, res, next) => {
    Logging.info(
      `Incoming -> Method: [${req.method} - Url: ${req.url} - IP: ${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      Logging.info(
        `Incoming -> Method: [${req.method} - Url: ${req.url} - IP: ${req.socket.remoteAddress}] - Status: ${res.statusCode}`
      );
    });

    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/authors", AuthorRoutes);

  /** Helathcheck */
  app.get("/test", (req, res, next) =>
    res.status(200).json({ message: "Success" })
  );

  /** Error handling */
  app.use((req, res, next) => {
    const error = "Endpoint not found!";
    Logging.error(error);
    next(createHttpError(404, error));
  });

  app.use(errorHandler);

  http
    .createServer(app)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`)
    );
};
