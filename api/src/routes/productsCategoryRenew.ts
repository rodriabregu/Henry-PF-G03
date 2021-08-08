/*
 * Root Example : /get/products/category?filter1=Mujer&filter2=Niños
 * si se hace un get en esta ruta se debe obtener los productos
 * que contengan alguna de los filtros especificados
 * Refactorización necesaria: en lugar de Op 'or' utilizar 'and' y recorrer
 * las diferentes categorías del producto para que se encuentren TODAS las
 * que se cargan en el query
 * Ver como mapear el query para completar automáticamente los elementos del or del where...
 */

import { Response, Request, Router } from 'express';
import { Op } from 'sequelize';
import { Product } from '../models/Product';
import { ProductsCategory } from '../models/ProductsCategory';
import { Category } from '../models/Category';
import { Photo } from '../models/Photo';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  console.table(req.query);

  try {
    let queryArray: number[] = Object['values'](req.query as any);

    let productsFound = await ProductsCategory.findAll({
      where: {
        categoryId: {
          [Op.in]: queryArray,
        },
      },
    });

    let productIdFound: number[] = [];

    for (let i = 0; i < productsFound.length; i++) {

      if(productIdFound.indexOf(productsFound[i].productId)) {
    
        productIdFound.push(productsFound[i].productId);
      }  
    }

    let productsFoundShow = await Product.findAll({
      where: {
        id: {
          [Op.in]: productIdFound,
        },
      },
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      include: [
        { model: Category, attributes: { exclude: ['updatedAt', 'createdAt'] } },
        { model: Photo, attributes: { exclude: ['updatedAt', 'createdAt'] } }
      ] 
    });

    if (productsFoundShow) return res.send(productsFoundShow);

  } catch (error) {

    res.status(404).send(`Product Categories : ${req.query.category} not found!`);
  }
});

export default router;
