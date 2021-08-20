import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { RiShoppingCartLine, RiAccountCircleLine, RiHome2Line } from 'react-icons/ri';
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
  const { user } = useAuth0<{ name: string, picture?: string }>();  //const {user} = useAuth0()

  //let countCart = 0;

  function toggleNavbar() {
    setNavbarCollapsed(!navbarCollapsed);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
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
          <div className={`links-login ${navbarCollapsed && "collapsed"}`}>
            <Link style={{ textDecoration: 'none' }} to='/cart'> CART <RiShoppingCartLine /> {countCart} </Link>

            {isAuthenticated ?
              (<div>
                <Link style={{ textDecoration: 'none' }} to='/logout'> LOGOUT<RiAccountCircleLine /> </Link>
                <Link style={{ textDecoration: 'none' }} to='/adashboard'>ADMIN DASHBOARD</Link>
                <div className='boxUser'><img src={user?.picture} />  {user?.name}</div>
              </div>)
              :
              (<div><Link style={{ textDecoration: 'none' }} to='/register'> REGISTER </Link>
                <Link style={{ textDecoration: 'none' }} to='/login'> LOGIN <RiAccountCircleLine /> </Link>
              </div>)}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;