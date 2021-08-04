import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import {RiShoppingCartLine, RiSettings5Line, RiAccountCircleLine, RiHome2Line} from 'react-icons/ri';


export const NavBar = () => {
  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='link-home'>
          <Link to='/home'> HOME <RiHome2Line/> </Link>
          </div>
          <div className='links-compra'>
            <Link to='/cart'> CART <RiShoppingCartLine/></Link>
            
            <Link to='/config'> SETTINGS <RiSettings5Line/> </Link>
          </div>
          <div className='links-login'>
            <Link to='/register'> REGISTER </Link>
          
            <Link to='/login'> LOGIN <RiAccountCircleLine/> </Link>
          </div>
        </div>
        </nav>
    </header>
  );
};

export default NavBar;
