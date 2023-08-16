import express from "express";
import bodyParser from "body-parser";
import { AdminRoute } from "./routes";
import { MONGO_URI } from "./config";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URI)
  .then((result) => {
    console.log("DB connected");
  })
  .catch((err) => console.log("err" + err));

app.use("/admin", AdminRoute);

app.listen(3000, () => {
  console.log("Server has been started");
});