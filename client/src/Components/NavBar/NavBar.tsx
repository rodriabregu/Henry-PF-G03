import { NavLink as Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export const NavBar = () => {
  return (
    <div>
      <Link to='/home'> HOME </Link>

      <Link to='/cart'> COMPRAS </Link>

      <Link to='/config'> AJUSTES </Link>

      <Link to='/register'> REGISTRARSE </Link>

      <Link to='/login'> LOGIN </Link>

      <SearchBar />
    </div>
  );
};

export default NavBar;
