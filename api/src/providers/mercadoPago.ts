import { appUser, appItem } from '../@app';

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TEST-1770294031185575-081220-f524bb2e6ae9a5f60f9729aa0668dea3-158490590'
});

export default async (user: appUser, items: appItem[]): Promise<string> => {

  const preference = {
    payer: {
      name: user.lastName,
      email: user.email,
      identification: {
        type: "DNI",
        number: "222222222"
      }
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
      success: "https://www.google.com/",
      failure: "http://www.tu-sitio/failure",
      pending: "http://www.tu-sitio/pending"
    }
  };
  const response = await mercadopago.preferences.create(preference)

  return response.body.init_point
}
