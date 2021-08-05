import { NavLink as Link } from 'react-router-dom';
import './NavBar.css';
import { RiShoppingCartLine, RiSettings5Line, RiAccountCircleLine, RiHome2Line } from 'react-icons/ri';
import SearchBar from '../SearchBar/SearchBar';

export const NavBar = () => {
  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='link-home'>
          <Link style={{ textDecoration: 'none' }} to='/home'> HOME <RiHome2Line/> </Link>
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
            <SearchBar />
          </div>
        </div>
        </nav>
    </header>
  )
};

export default NavBar;
