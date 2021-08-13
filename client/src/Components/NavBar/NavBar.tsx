import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { RiShoppingCartLine, RiAccountCircleLine, RiHome2Line } from 'react-icons/ri';
import './NavBar.css';


export const NavBar = () => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  function toggleNavbar() {
    setNavbarCollapsed(!navbarCollapsed);
  }

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
            <Link style={{ textDecoration: 'none' }} to='/cart'> CART <RiShoppingCartLine /></Link>
            <Link style={{ textDecoration: 'none' }} to='/register'> REGISTER </Link>
            <Link style={{ textDecoration: 'none' }} to='/login'> LOGIN <RiAccountCircleLine /> </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
