import { useState, useEffect } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { RiShoppingCartLine, RiAccountCircleLine, RiHome2Line } from 'react-icons/ri';
import './NavBar.css';
import { getAllByPlaceholderText } from '@testing-library/react';

export interface Ee {
  "name": "<anystring>",
  "price": "<anystring>",
  "stock": "<anystring>",
  "id": "<anystring>",
  "brand": "<anystring>",
  "photo": "<anystring>",
  "description": "<anystring>",
  "value": "<anystring>",
  "categories": "<anystring>",
  "productId": "<anystring>",
  "units": "<anystring>",
}


export const NavBar = () => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const [renderCart, setRenderCart] = useState<any>(0);

  let countCart = 0;

  function toggleNavbar() {
    setNavbarCollapsed(!navbarCollapsed);
  };

  useEffect(() => {
    const allCartNoJson:any = localStorage.getItem('products-cart');
    const allCart = JSON.parse(allCartNoJson)
    allCart?.forEach((e:any) => {
      countCart += e.value.value
      setRenderCart(countCart)
    });
  });


  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='link-home'>
            <Link to='/home'> <button className='button-home' > HOME <RiHome2Line /> </button></Link>
            <span className='btn-menu' onClick={toggleNavbar}> <FaBars /></span>
          </div>
          <div className={`links-login ${navbarCollapsed && "collapsed"}`}>
            <Link style={{ textDecoration: 'none' }} to='/create'>CREATE PRODUCT</Link>
            <Link style={{ textDecoration: 'none' }} to='/createCategory'>CREATE CATEGORY</Link>
            <Link style={{ textDecoration: 'none' }} to='/cart'> CART {renderCart} <RiShoppingCartLine /></Link>
            <Link style={{ textDecoration: 'none' }} to='/register'> REGISTER </Link>
            <Link style={{ textDecoration: 'none' }} to='/login'> LOGIN <RiAccountCircleLine /> </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;