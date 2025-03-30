import {Router} from "express";
import { Login, Logout, Register } from "../controllers/Auth.js";

const router=Router();

router.post('/sign-up',Register)
router.post('/login',Login)
router.get('/logout',Logout)

export default router