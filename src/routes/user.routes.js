import { Router } from 'express';
import {
  createUser,
  getAllUser,
  updateUser,
  getUser,
} from '../controllers/user.controllers.js';
import { createUserVerify } from '../middlewares/user.middleware.js';

const router = Router();

router.get('/user', getAllUser);
router.post('/user', createUserVerify, createUser);
router.put('/user/:id', updateUser);
router.post('/user/register', getUser);
export default router;
//TODO CAMBIAR EL REGISTER DE LUGAR EN CREATE USER Y USER SOLO EN REGISTER
