import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/getProducts';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const products = useSelector<any>((state) => state.products);
  console.log(products);

  useEffect(() => {
    dispatch(getProducts);
  },[]);

  return (
    <div>
      <h1>NO ME LA CREO</h1>
    </div>
  );
};

export default Home;
