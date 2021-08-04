import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div>
      <Link to='/home'> HOME </Link>

      <Link to='/cart'> COMPRAS </Link>

      <Link to='/config'> AJUSTES </Link>

      <Link to='/register'> REGISTRARSE </Link>

      <Link to='/login'> LOGIN </Link>
    </div>
  );
};

export default NavBar;
