import express from 'express';
import { registerUSer, login } from '../controllers/userController.js';

const router = express.Router();


router.route('/register').post(registerUSer);
router.route('/login').post(login);

export default router;
