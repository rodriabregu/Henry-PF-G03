import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/getProducts';
import {IInfo} from "../../Data/index"

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const products:any = useSelector<any>((state) => state.products);
  useEffect(() => {
    dispatch(getProducts);
  }, []);

  return (
    <div>
      {products.map((e:IInfo,index:number) =>{
        return (
          <div key={index}>
            <h1>{e.name}</h1>
            <img src={e.img} alt={e.name} />
          </div>
        )})}
      <h1>NO ME LA CREO</h1>
    </div>
  );
};

export default Home;
