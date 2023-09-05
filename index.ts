import App from "./services/express";
import express from "express";
import database from "./services/database";

const startServer = async () => {
  const app = express();
  await database();
  await App(app);

  app.listen(8000, () => {
    console.log("Listening on port 8000");
  });
};

startServer();
