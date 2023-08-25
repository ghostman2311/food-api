import express from "express";
import { GetVendorProfile, VendorLogin } from "../controllers";
import { Authenticate } from "../middleware/commonAuth";

const router = express.Router();

router.post('/login', VendorLogin)
router.get('/profile',Authenticate, GetVendorProfile)


export { router as VendorRoute };
