import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { getProducts } from '../../Redux/Actions/getProducts';
import { RiShoppingCartLine, RiSettings5Line, RiAccountCircleLine, RiHome2Line } from 'react-icons/ri';
import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar';

export const NavBar = () => {
  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='link-home'>
            <Link to='/home'> 
              <button className='button-home' >
                HOME <RiHome2Line/> 
              </button>
            </Link>
          </div>
          <div className='links-compra'>
            <Link style={{ textDecoration: 'none' }} to='/cart'> CART <RiShoppingCartLine/></Link>
            
            <Link style={{ textDecoration: 'none' }} to='/config'> SETTINGS <RiSettings5Line/> </Link>
          </div>
          <div className='links-login'>
            <Link style={{ textDecoration: 'none' }} to='/register'> REGISTER </Link>
          
            <Link style={{ textDecoration: 'none' }} to='/login'> LOGIN <RiAccountCircleLine/> </Link>
          </div>
          <div className='searchbar'>
          </div>
        </div>
        </nav>
    </header>

  )
};

export default NavBar;
