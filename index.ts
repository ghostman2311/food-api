import express from "express";
import bodyParser from "body-parser";
import { AdminRoute, VendorRoute } from "./routes";
import { MONGO_URI } from "./config";
import mongoose from "mongoose";
import path from 'path'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')))

mongoose
  .connect(MONGO_URI)
  .then((result) => {
    console.log("DB connected");
  })
  .catch((err) => console.log("err" + err));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute)

app.listen(3000, () => {
  console.log("Server has been started");
});
