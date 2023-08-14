import express from "express";
import bodyParser from "body-parser";
import { AdminRoute } from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoute)

app.listen(3000, () => {
  console.log("Server has been started");
});
