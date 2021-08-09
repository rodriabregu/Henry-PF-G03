import { Response, Request } from 'express';
import { Op } from 'sequelize';
import { productOptions } from '../@app'
import { Product, ProductsCategory }  from '../db';

/**
 * Root Example : GET /api/products/category?c1=1&c2=2....cn=n
 * responde con los productos que contengan
 * las n categorias especificadas por query
 */

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  console.table(req.query);

  try {
    const categories: number[] = Object.values(req.query as any)

    const relations: any[] = await ProductsCategory.findAll({
      where: { categoryId: { [Op.or]: categories } }
    })

    const { productIds } = relations.reduce(
      (acum, relation) => {
        const { productId } = relation

        if (acum[productId]) {
          acum[productId] += 1
        } else acum[productId] = 1

        if (acum[productId] === categories.length)
          acum.productIds.push(productId)

        return acum;
      }, { productIds: [] }
    )

    return res.send({
      data: await Product.findAll({
        where: { id: { [Op.in]: productIds } },
        ...productOptions
      })
    });
  } catch (error) {
    res.status(404).send({
      data: [],
      mesasge: `Product Categories : ${req.query.category} not found!`
    });
  }
});

export default router;
