import express from 'express';
import { postMessage, getMessages } from '../controllers/messageController.js'


const router = express.Router();

router.route('/').post(postMessage);
router.route('/').get(getMessages);

export default router;