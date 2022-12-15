import { Router } from 'express';
import { getAllTemperaments } from '../controllers/temperaments.controller.js';

const router = Router();

router.get('/temperaments', getAllTemperaments);
export default router;
