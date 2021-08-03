import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/getProducts';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();

  const products = useSelector<any>((state) => state.products);

  useEffect(() => {
    dispatch(getProducts);
  });

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Home;
