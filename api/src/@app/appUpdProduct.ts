
export default interface appUpdProduct {

  id:           number 
  price:        number  
  name:         string 
  stock:        number
  description:  string, 
  brand:        string
  
    //photos: appPhoto[]
    //sport: string
    //categories: appCategory[]
 
  }
  
  const product: appUpdProduct = {
    
    "id": 1,
    "name": "NIKE - 6 pack",
//    "photo": "https://www.zeuscalabria.it/32939-home_default/nike-hairbands-3-pack-bianco-e-nero-njn04983os.jpg",
    "description": "zeuscalabria",
    "price": 54,
    "stock": 15,
    "brand": "NIKE"
//    "category": "ert"
  }
  