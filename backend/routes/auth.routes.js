import express from "express"
import { authenticationLogin,
		 authenticationSignUp,
		 authenticationLogout } from "../controllers/auth.controller.js"

const router = express.Router();

router.post('/signup', authenticationSignUp);
router.post('/login', authenticationLogin);
router.get('/logout', authenticationLogout);

export default router;
