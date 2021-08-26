import { transporter } from '../lib/transporter'
import config from '../lib/config'
import { User, Product, CartItem } from '../db'

const html = async (accion: string, userId: string): Promise<string> => {
  switch (accion) {
    case "Welcome":
      return "<h4> Helo {firstName} welcome to club crotones your user is {userName} </h4>";
    case "Created": case "Processing": case "Cancelled": case "Complete":
      return "<h4> Helo {firstName} your sale number: {saleId} now is {state} </h4>";
    case "Card":
      const user = await User.findByPk(userId,
        { include: { model: CartItem } }
      )
      if (!user) throw { status: 404, message: " user not found" }
      const { cartItems } = user.get()
      if (!cartItems || cartItems.length <= 0) { throw { status: 404, message: " cart not found" } }

      const divsProducts: string[] = await Promise.all(
        cartItems.map(async (item: { productId: number, units: number }) => {
          const product = await Product.findByPk(item.productId)
          if (!product) throw { status: 404, message: " product not found" }
          const { name, price } = await product.get()
          return `<div><h5>${name}</h5><p>units: ${item.units}</p><p>price: ${price}.00</p></div>`
        })
      )
      let message =
        "<body><h4> Helo {firstName} There were pending products in your cart</h4></br><div>"

      divsProducts.map(
        (divProduct: string) => message += divProduct
      )

      return message +=
        `</div><a href=\"http://${config.host}:${config.clientPort}/cart\">continue with your purchase here </a></body>`
    default:
      return "<p> message club crotones </p>";
  }
}

/**
 * userId 
 * accion
 */
export default async (userId: string, accion: string, saleId: number = 0) => {
  const user = await User.findByPk(userId)
  if (!user) throw Error(`sent imail - user ${userId} is not`)
  const { email, firstName, userName } = user.get()
  await transporter.sendMail({
    from: '"club crotones" <clubcrotones@gmail.com>', // sender address
    to: email, // list of receivers
    subject: accion,  // Subject line
    //text: "esto es el texto", // plain text body
    html: (await html(accion, userId))
      .replace(/\{firstName\}/g, firstName)
      .replace(/\{userName\}/g, userName)
      .replace(/\{saleId\}/g, `${saleId}`)
      .replace(/\{state\}/g, accion)
  });
}