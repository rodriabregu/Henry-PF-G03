import { NavLink as Link } from 'react-router-dom';
import './AboutUs.css';

export const AboutUs = () => {
    return(
        <div className='container-about'>            
          <h1>About us</h1>
          <div className='container-textabout'>
                <h4>We are a team that has developed an ecommerce based on FC Crotone, 
                    a soccer team from Italy.</h4>
                <h4>To meet our developers go to <Link to='/ContactUs' style={{textDecoration:'none', color:'black'}}> Contact Us</Link>.</h4>
                <h4>Our E-commerce has sports products: Clothing, 
                    Accessories, Sports equipment, among others.</h4>
                <h4>This e-commerce has been developed in the context of the 
                    Final Project for the HenryLabs stage of the Bootcamp <a href='https://www.soyhenry.com/' style={{textDecoration:'none', color:'black'}}>soyHenry</a>.</h4>
                <h4>This project has been carried out during the month of August / 2021.</h4>
            </div>
            <div><h2>Technologies :</h2></div>
            <div>
                <div className='div-logos' style={{display:'flex', alignItems:'center'}}>
                    <img src='https://www.hebergementwebs.com/image/ce/ce14535fba661dc4376cddd62956fa61.png/autenticacion-en-aplicaciones-web-conexion-de-auth0-asp-net-core-y-nuxt-js.png' alt='auth0' width='230px' height='140px'/>
                    <img src='https://seeklogo.com/images/M/mercado-pago-logo-CC340D0497-seeklogo.com.png' alt='MercadoPago' width='270px' height='70px'/>
                </div>
                <div className='div-logos' style={{display:'flex', alignItems:'center'}}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Google_Maps_Logo.svg/1024px-Google_Maps_Logo.svg.png' alt='GoogleMaps' width='330px' height='75px'/>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/600px-Typescript_logo_2020.svg.png' alt='TS' width='100px' height='100px'/>
                </div>
            <div className='div-logos' style={{display:'flex', alignItems:'center'}}>
            <img src='https://miro.medium.com/max/734/1*PXPRvzEipmCU-FsR7OjC2w.png' alt='PM2' width='230px' height='150px'/>
                <img src='https://camo.githubusercontent.com/58e35d08b53ec029f0e3e587a28a6f65777d352f797add843d153a0db60b9d7d/68747470733a2f2f692e696d6775722e636f6d2f79764559686e5a2e706e67' alt='Sequelize' width='200px' height='150px'/>
            </div>
            <div className='div-logos' style={{display:'flex', alignItems:'center'}}>
                <img src='https://www.linuxcapable.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/05/nginx-1.png.webp' alt='Sequelize' width='230px' height='150px'/>
                <img src='https://camo.githubusercontent.com/c7cd26def93db19affeb8c6af3009fd15720ce38f6259e730699a305c676a820/68747470733a2f2f7777772e66726565636f646563616d702e6f72672f6e6577732f636f6e74656e742f696d616765732f73697a652f77323030302f323032302f30332f5045524e2e706e67' alt='Pern' width='250px' height='150px'/>
            </div>
            </div>
        </div>
    )
};

export default AboutUs;