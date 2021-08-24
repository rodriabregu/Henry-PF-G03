
export interface brand {
  name: string
  id: number
}

export interface review {
  text: string
  id: number
  stars: number
  ProductId: number
}

export interface item {
  productId: number
  units: number
};

export interface user {
  id: string
  userName: string
  email: string
  hashPasword: string
  firstName: string
  lastName: string
  userType:string
}

export interface photo {
  url: string
  id: number
}

export interface category {
  name: string
  id: number
}

export interface product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  brand: brand
  reviews: review[]
  photos: photo[]
  categories: category[]
}

export interface state {
  products: product[], 
  productsDetail: product,
  AllProducts: product[],
  sales: {}[],
  url_pago: string,
  cart: item[],
  user: user,
};
