import { Router } from 'express';
// Importar todos los routers;
import {
  getAllDogs,
  getOneDog,
  postCreateDog,
  updateDog,
  deleteDog,
} from '../controllers/dog.controller.js';
import { existRace, updateRace } from '../middlewares/dog.middlewares.js';
const router = Router();
// Configurar los routers
router.get('/dogs', getAllDogs);
router.get('/dogs/:id', getOneDog);
router.post('/dogs', existRace, postCreateDog);
router.put('/dogs/:id', updateRace, updateDog);
router.delete('/dogs/:id', deleteDog);
export default router;
