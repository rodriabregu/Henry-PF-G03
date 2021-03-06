import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { RiShoppingCartLine, RiAccountCircleLine, RiHome2Line, RiLogoutBoxRLine } from 'react-icons/ri';
import { FaBars } from 'react-icons/fa';
import { useAuth0 } from "@auth0/auth0-react";
import { state, /* product */ user } from '../../typesApp'
import { getProducts } from '../../Redux/Actions/Products/getProducts';
import jwt_decode from 'jwt-decode';
import logo from './logo.png';
import './NavBar.css';

export const NavBar = () => {
  const dispatch: Function = useDispatch()
  const countCart = useSelector((state: state) => state.cart.length)
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0<{ name: string, picture?: string, sub: string }>();  //const {user} = useAuth0()

  const userLog: user = useSelector((s: state) => s.user)

  function toggleNavbar() {
    setNavbarCollapsed(!navbarCollapsed);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [admin, setAdmin] = useState(false);

  async function GetToken() {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();
    var aux: any = await jwt_decode(token);
    if (aux.permissions[0] === "admin") {
      setAdmin(true)
      return 'es admin'
    } else {
      setAdmin(false)
      return 'no es admin'
    }
  };

  if (isAuthenticated) {
    GetToken()
      .then(resp => console.log(resp))
  };

  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='link-home'>
          <div className='div-btn-logo'> 
            <Link to='/'> <img className='img-nav' src={logo} alt='FC Crotone' width='30px' height='30px'/></Link>
            <Link to='/home' style={{ textDecoration: 'none' }}> <button className='button-home'> HOME <RiHome2Line /> </button></Link>
          </div>
            <span className='btn-menu' onClick={toggleNavbar}> <FaBars /></span>
          </div>
          { isAuthenticated ? (
            <div className={`links-login ${navbarCollapsed && "collapsed"}`}>
              <Link style={{ textDecoration: 'none' }} to='/cart'> CART <div className='backg-cart'>{countCart}</div>
                <RiShoppingCartLine />
              </Link>
              {
                userLog?.userType === 'Admin' && <Link style={{ textDecoration: 'none' }} to='/adashboard'>ADMIN DASHBOARD</Link>
              }
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