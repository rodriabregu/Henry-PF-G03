import { NavLink } from "react-router-dom";
import './Footer.css';
import { RiInstagramLine, RiFacebookFill, RiTwitterLine } from 'react-icons/ri'

export const Footer = () => { 
  return (
    <div className='footer-container'>
      <footer>
        <div className='footer'>
        <div className='links'>
          <NavLink to="/cart">About us</NavLink>
          <br></br>
          <NavLink to="/cart">Contact us</NavLink>
          <br></br>
          <NavLink to="/cart">F.A.Q</NavLink>
        </div>
        <div>
          <div className='social-icons'>
              <NavLink to="/cart"><RiInstagramLine/></NavLink>
              <NavLink to="/cart"><RiFacebookFill/></NavLink>
              <NavLink to="/cart"><RiTwitterLine/></NavLink>
            </div>
        </div>
        </div>
          <div className='copyrigth'>
              © Copyrigth 2021 - Grupo 03/ FT 14a. For PG HenryLabs.
          </div>
      </footer>
    </div>
  );
};

export default Footer;