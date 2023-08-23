import express from "express";
import { GetVendorProfile, VendorLogin } from "../controllers";

const router = express.Router();

router.post('/login', VendorLogin)
router.get('/profile', GetVendorProfile)


export { router as VendorRoute };
