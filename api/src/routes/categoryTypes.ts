import { Router, Request, Response } from 'express';
import { Category } from '../models/Category';
import {CategoryType} from '../models/CategoryType'
const router = Router();


router.get('/', async(req: Request, res: Response) => {

  console.log('estoy en tipo de categorias');

  const tipoCategoria=new CategoryType({description:'Deporte'})
  tipoCategoria.save();

  const tipoNuevo=await CategoryType.create({description:'genero'})

  res.send('tipos de categoria creadas!')
  
})

export default router;

