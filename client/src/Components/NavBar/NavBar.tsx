import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { RiShoppingCartLine, RiAccountCircleLine, RiHome2Line, RiLogoutBoxRLine } from 'react-icons/ri';
import { FaBars } from 'react-icons/fa';
import './NavBar.css';
import { useAuth0 } from "@auth0/auth0-react";
import { getCart } from '../../Redux/Actions/Cart/getCart'
import { state } from '../../Redux/Reducers/Reducers'
import { getProducts } from '../../Redux/Actions/Products/getProducts';

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
  const dispatch: Function = useDispatch()
  const countCart = useSelector((state: state) => state.cart.length)
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0<{ sub: string, name: string, picture?: string }>();

  function toggleNavbar() {
    setNavbarCollapsed(!navbarCollapsed);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart(user?.sub))
  }, [dispatch]);

  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='link-home'>
            <Link to='/home' style={{ textDecoration: 'none' }}> <button className='button-home'> HOME <RiHome2Line /> </button></Link>
            <span className='btn-menu' onClick={toggleNavbar}> <FaBars /></span>
          </div>
          {isAuthenticated ? (
            <div className={`links-login ${navbarCollapsed && "collapsed"}`}>

              <Link style={{ textDecoration: 'none' }} to='/cart'> CART <div className='backg-cart'>{countCart}</div>
                <RiShoppingCartLine />
              </Link>

              <Link style={{ textDecoration: 'none' }} to='/adashboard'>ADMIN DASHBOARD</Link>
              <Link style={{ textDecoration: 'none' }} to='/favs'>FAVS</Link>
              <Link style={{ textDecoration: 'none' }} to='/logout'> LOGOUT<RiLogoutBoxRLine /> </Link>
              <Link style={{ textDecoration: 'none' }} to='/account'><img src={user?.picture} className='navimg' alt='profile' />{user?.name}</Link>

            </div>
          )
            :
            (
              <div className={`links-login ${navbarCollapsed && "collapsed"}`}>
                <Link style={{ textDecoration: 'none' }} to='/cart'> CART <div className='backg-cart'>{countCart}</div>
                  <RiShoppingCartLine />
                </Link>


                <Link style={{ textDecoration: 'none' }} to='/login'> LOGIN / SIGN UP <RiAccountCircleLine /> </Link>

              </div>
            )
          }
        </div>

      </nav>
    </header>
  );
};

export default NavBar;