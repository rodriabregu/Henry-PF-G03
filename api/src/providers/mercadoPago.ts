import { appUser, appItem } from '../@app';
import config from '../lib/config'

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: "APP_USR-7071583936699331-081404-d4ce02d08b6ee7989a7b72134af75008-807578983" //'TEST-3292359918323776-081401-4a2a4b3cb81f2a1251e52c67b1073525-158490590'
});

export default async (user: appUser, items: appItem[], saleId: number): Promise<any> => {

  const preference = {
    payer: {
      name: user.firstName,
      surname: user.lastName,
      email: user.email,
    },

    items: items.map((item: appItem): {} => {
      return {
        title: item.productName,
        id: item.productId,
        quantity: item.units,
        category_id: 'others',
        //currency_id: 'COP',
        unit_price: item.salePrice
      }
    }),
    back_urls: {
      success: `http://${config.host}:${config.clientPort}/checkout/${saleId}/success`,
      failure: `http://${config.host}:${config.clientPort}/checkout/${saleId}/failure`,
      pending: `http://${config.host}:${config.clientPort}/checkout/${saleId}/pending`
    },
    auto_return: "approved",
  };
  const response = await mercadopago.preferences.create(preference)
  if (!response) throw Error("mercado pago no respondió")
  return response
}
