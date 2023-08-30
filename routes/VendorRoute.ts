import express from "express";
import { AddFood, GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from "../controllers";
import { Authenticate } from "../middleware/commonAuth";

const router = express.Router();

router.post('/login', VendorLogin)
router.use(Authenticate)
router.get('/profile', GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('/service', UpdateVendorService)
router.post('/food', AddFood)

export { router as VendorRoute };
