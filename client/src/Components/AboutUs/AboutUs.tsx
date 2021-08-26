import { NavLink as Link } from 'react-router-dom';
import './AboutUs.css';

export const AboutUs = () => {
    return(
        <div className='container-about'>            
          <h1>About us</h1>
          <div className='container-textabout'>
                <h2>We are a team that has developed an ecommerce based on FC Crotone, 
                    a soccer team from Italy.</h2>
                <h2>To meet our developers go to <Link to='/ContactUs'> Contact Us</Link>.</h2>
                <h2>Our E-commerce has sports products: Clothing, 
                    Accessories, Sports equipment, among others.</h2>
                <h2>This e-commerce has been developed in the context of the 
                    Final Project for the HenryLabs stage of the Bootcamp <a href='https://www.soyhenry.com/'>soyHenry</a>.</h2>
                <h2>This project has been carried out during the month of August / 2021.</h2>
            </div>
        </div>
    )
};

export default AboutUs;