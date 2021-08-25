import { Router, Request, Response } from 'express';
import { Destiny, Sale } from '../db';
const router = Router();


router.post('/', async (req: Request, res: Response) => {

  const { localAddress, mapAddress, description, fullName, dni, preferenceId } = req.body;
  const sale = await Sale.findOne({where: {preferenceId}})
  if(!sale) throw {satatus: 404, message: "sale no fund"}
  let resp = await Destiny.create({
    localAddress,
    mapAddress,
    description,
    fullName,
    dni,
    saleId: sale.getDataValue("id")
  })

  return res.json(resp)
})


router.get('/', async (req: Request, res: Response) => {


  let destinies = await Destiny.findAll({
    include: {
      model: Sale
    }
  })

  res.json(destinies)

})





export default router;