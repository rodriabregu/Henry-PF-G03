
export default interface appProduct {

  name: string
  photos: string[] // | appPhoto[];
  description: string
  price: number
  stock: number
  brand: string
  //sport: string
  //categories: string[] //| appCategory[]

}

const product: appProduct = {

  "name": "NIKE - Esteban 6 pack",
  "photos": ["https://www.zeuscalabria.it/32939-home_default/nike-hairbands-3-pack-bianco-e-nero-njn04983os.jpg"],
  "description": "zeuscalabria",
  "price": 54,
  "stock": 15,
  "brand": "NIKE"
}
