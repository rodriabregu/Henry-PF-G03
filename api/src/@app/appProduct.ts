import { appPhoto } from "../@app"

export default interface appProduct {

  name: string;  
  photos?: appPhoto[]
  description: string;
  price: number;
  stock: number;
  brand: string;
  sport: string;
  //categories?: Category[];

}