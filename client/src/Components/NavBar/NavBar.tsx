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
  //const countProducts = useSelector((state: state) => state.AllProducts.length)
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  //const [renderCart, setRenderCart] = useState<number>(0);
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0<{ sub: string, name: string, picture?: string }>();  //const {user} = useAuth0()

  //let countCart = 0;

  function toggleNavbar() {
    setNavbarCollapsed(!navbarCollapsed);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart(user?.sub))
  }, [dispatch]);

  /* 
    useEffect(() => {
      const allCartNoJson:any = localStorage.getItem('products-cart');
      const allCart = JSON.parse(allCartNoJson)
      allCart?.forEach((e:any) => {
        countCart += e.value.value
        setRenderCart(countCart)
      });
    });
   */

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
              <Link style={{ textDecoration: 'none' }} to='/account'><img src={user?.picture} className='navimg' />{user?.name}</Link>

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