import express, { Application } from "express";
import bodyParser from "body-parser";
import { AdminRoute, VendorRoute, ShoppingRoute, UserRoute } from "../routes";
import path from "path";

export default async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/images", express.static(path.join(__dirname, "images")));

  app.use("/admin", AdminRoute);
  app.use("/vendor", VendorRoute);
  app.use('/user', UserRoute)
  app.use(ShoppingRoute)
};
