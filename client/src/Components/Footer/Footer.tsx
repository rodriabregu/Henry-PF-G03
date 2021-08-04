import React from 'react';
import { NavLink } from "react-router-dom";

export const Footer = () => { 
  return (
    <div className='containFooter'>
      
        <div>
          <NavLink to="/aboutUs">About us</NavLink>
          <br></br>
          <NavLink to="/aboutUs">Contact us</NavLink>
          <br></br>
          <NavLink to="/faq">F.A.Q</NavLink>
        </div>
        <div>
          <div>
              Instagram
          </div>
            <div>
                Facebook 
            </div>
          <div>
              © Copyrigth 2021 - Grupo 03/ FT 14a
          </div>
        </div>
    </div>
  );
};

export default Footer;