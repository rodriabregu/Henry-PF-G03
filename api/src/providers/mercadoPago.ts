import { appUser, appItem } from '../@app';

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TEST-1770294031185575-081220-f524bb2e6ae9a5f60f9729aa0668dea3-158490590'
});

export default async (user: appUser, items: appItem[], saleId: number): Promise<{}> => {

  const preference = {
    payer: {
      name: user.lastName,
      email: user.email,
    },

    items: items.map((item: appItem): {} => {
      return {
        title: item.productName,
        id: item.productId,
        quantity: item.units,
        unit_price: item.salePrice * 1000
      }
    }),
    back_urls: {
      success: `http://localhost:3000/checkout/${saleId}/success/${Math.floor(Math.random() * Date.now())}`,
      failure: `http://localhost:3000/checkout/${saleId}/failure`,
      pending: `http://localhost:3000/checkout/${saleId}/pending`
    }
  };
  const response = await mercadopago.preferences.create(preference)
  if(!response) throw Error("mercado pago no respondió")
  return response
}
