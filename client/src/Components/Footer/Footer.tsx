import { NavLink } from "react-router-dom";
import './Footer.css';
import { RiInstagramLine, RiFacebookFill, RiTwitterLine } from 'react-icons/ri'

export const Footer = () => { 
  return (
    <div className='footer-container'>
      <footer>
        <div className='footer'>
        <div className='links'>
          <NavLink to="/AboutUs">About us</NavLink>
          <br></br>
          <NavLink to="/ContactUs">Contact us</NavLink>
          <br></br>
          <NavLink to="/faq">F.A.Q</NavLink>
        </div>
        <div>
          <div className='social-icons'>
              <NavLink to="/ContactUs"><RiInstagramLine/></NavLink>
              <NavLink to="/ContactUs"><RiFacebookFill/></NavLink>
              <NavLink to="/ContactUs"><RiTwitterLine/></NavLink>
            </div>
        </div>
        </div>
          <div className='copyright'>
              © Copyright 2021 - Grupo 03/ FT 14a. For PG HenryLabs.
          </div>
      </footer>
    </div>
  );
};

export default Footer;