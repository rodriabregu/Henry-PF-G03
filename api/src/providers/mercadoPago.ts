import { appUser, appItem } from '../@app';

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TEST-4464086672923304-081215-73061cc2dfa5eaba45a4c8d198b51f32-103105516'
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
