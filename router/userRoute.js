import express from 'express';
import multer from 'multer';
import { registerUser, getAllUsers } from '../controller/userController.js';
import User from '../models/usersModel.js';

const upload = multer({ dest: 'public/images/' });
const router = express.Router();

router.post('/register', upload.single('image'), registerUser);
router.get('/', getAllUsers);

export default router;
