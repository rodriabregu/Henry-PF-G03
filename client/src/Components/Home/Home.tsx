import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/getProducts';
import { getProductsDetail } from '../../Redux/Actions/getProductsDetail';
import {IInfo} from "../../Data/index";
import SearchBar from '../SearchBar/SearchBar';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const products:any = useSelector<any>((state) => state.products);
  const productDetail = useSelector((s:any) => s.productsDetail)
  console.log(productDetail)


  useEffect(() => {
    dispatch(getProducts);
  }, []);

  return (
    <div>
      <SearchBar/>
      { productDetail.length > 1 ? 
      productDetail.map((e:IInfo,index:number) =>{
        return (
          <div key={index}>
            <h1>{e.id}</h1>
            <img src={e.img} alt={e.name} />
          </div>
        )}) 
        :
        products.map((e:IInfo,index:number) =>{
          return (
            <div key={index}>
              <h1>{e.name}</h1>
              <img src={e.img} alt={e.name} />
            </div>
          )}) 
      }
    </div>
  );
};

export default Home;
