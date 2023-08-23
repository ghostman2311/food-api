import express from "express";
import { VendorLogin } from "../controllers";

const router = express.Router();

router.post('/login', VendorLogin)


export { router as VendorRoute };
