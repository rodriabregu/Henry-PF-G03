import Offers from '../Offers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/Products/getProducts';
import Slide from '../Slide/Slide'
import './LandingPage.css';

export const Landing = () => {
    const dispatch = useDispatch();

    const allProducts = useSelector(s => s.products);
    const randomPage1 = Math.floor(Math.random() * 5) + 1;
    const filterProducts =  allProducts?.slice(randomPage1, 8)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    return (
    <div className='landing'>
        <Slide/>
        {/* <div><img className="loading" src="https://images6.alphacoders.com/115/thumb-1920-1158225.png" alt="Enter" /></div> */}
       {/*  <Offers filterProducts={filterProducts}/> */}
    </div>
    )
};

export default Landing;