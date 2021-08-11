import { Router, Request, Response } from 'express';

import { addProduct } from '../providers';
import { productOptions } from "../@app"
import {Op} from 'sequelize' 
import { Product } from '../db'
import {Category} from '../models/Category'

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  return Product
    .findAll({...productOptions,
      where:{ 
        stock:{
      [Op.gt]:0
      },
      //isActive:true
  }
  })
    .then((products) => {
      return res.json({
        message: 'Success',
        data: products
      })
    })
})

/* de los campos repetidos deve estar
 almenos uno en su respectivo formato*/
const body = {
  "product": {
    "name": " Esteban pack",
    "price": 45,
    "stock": 15,
    "photo": "product.photo",
    "category": 4,
    "description": "zeuscalabria",
    "brand": "NIKE"
  },
  "photos": ["https://www.zeuscalabria.it/32939-home_default/nike-hairbands-3-pack-bianco-e-nero-njn04983os.jpg", "photoN"],
  "descriptions": ["description1", "descriptionN"],
  "brand": "brand1",
  "categories": [2, 4]
}

router.post('/', (req: Request, res: Response) => {
  const {
    product, photos, categories, comments, brand
  } = req.body

  console.log(categories)

  /*
  let categories=[];
  categoriesString.forEach(async(c:any,i:number)=>{
    let category=await Category.findOne({where:{name:c},attributes:['id']})
    let id=await category?.getDataValue('id');
    categories.push(id)    
  })

  console.log(categories)
  */


  if (!(
    product
    && product.name
    && typeof product.name === "string"
    && (product.photo || photos)
  ))
    return res.status(404).json({
      message: " body data is not validate ",
      data: {}
    })

  if (categories && categories[0]) product.category = categories[0];
  if (comments && comments[0]) product.commentary = comments[0];
  if (photos && photos[0]) product.photo = photos[0];
  if (brand) product.brand = brand;

  return addProduct(product,
    photos || [product.photo],
    categories || [product.category]
  )
    .then((productId) => {
      return Product.findOne({
        where: { id: productId }, ...productOptions,
      })
    })
    .then((product) => {
      return res.json({
        message: " product saved successfully ",
        data: product
      })
    })
    .catch((error) => {
      return res.status(404).json({
        message: " failed operation ",
        error,
        data: {}
      })
    })
})

export default router;
