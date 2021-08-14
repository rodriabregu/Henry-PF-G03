import { appUser, appItem } from '../@app';

const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: "APP_USR-7071583936699331-081404-d4ce02d08b6ee7989a7b72134af75008-807578983" //'TEST-3292359918323776-081401-4a2a4b3cb81f2a1251e52c67b1073525-158490590'
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
        unit_price: item.salePrice 
      }
    }),
    back_urls: {
      success: `http://localhost:3000/checkout/${saleId}/success`,
      failure: `http://localhost:3000/checkout/${saleId}/failure`,
      pending: `http://localhost:3000/checkout/${saleId}/pending`
    }
  };
  const response = await mercadopago.preferences.create(preference)
  if(!response) throw Error("mercado pago no respondió")
  return response
}
