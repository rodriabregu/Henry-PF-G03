import EstebanPlanells from './EstebanPlanells.jpg';
import FacundoVignoles from './FacundoVignoles.jpg';
import GabrielaLescano from './GabrielaLescano.jpg';
import JuanEstebanQuinteroBedoya from './JuanEstebanQuinteroBedoya.jpg';
import LeonardoCatto from './LeonardoCatto.jpg';
import MarianoGalli from './MarianoGalli.jpg';
import RodrigoAlcino from './RodrigoAlcino.jpg';
import WaldoVazquez from './WaldoVazquez.jpg';
import { NavLink } from "react-router-dom";
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5'
import './ContactUs.css';

export const ContactUs = () => {
    return(
        <div>
            <div className='title-dev'>
                <h1> Developers </h1>
                <h3> Group 03/ FT 14a</h3>
            </div>
                <div className='container-cards'>
                    <div className='card-integrante'>
                        <img src={EstebanPlanells} alt='home' width='200 px' height='200px'/>
                        <h3> Esteban Planells</h3>
                        <div className='links-contact'>
                            <a href='https://www.linkedin.com/in/estebanplanells/'><IoLogoLinkedin/></a>
                            <a href="https://github.com/Planellse"><IoLogoGithub/></a>
                        </div>
                    </div>
                    <div className='card-integrante'>
                        <img src={FacundoVignoles} alt='home' width='200 px' height='200px'/>
                        <h3> Facundo Vignoles</h3>
                        <div className='links-contact'>
                            <a href='https://www.linkedin.com/in/fvignoles/'><IoLogoLinkedin/></a>
                            <a href="https://github.com/fvignoles"><IoLogoGithub/></a>
                        </div>
                    </div>
                    <div className='card-integrante'>
                        <img src={GabrielaLescano} alt='home' width='200 px' height='200px'/>
                        <h3> Gabriela Lescano</h3>
                        <div className='links-contact'>
                            <a href='https://www.linkedin.com/in/gabriela-lescano/'><IoLogoLinkedin/></a>
                            <a href="https://github.com/GabrielaLescano"><IoLogoGithub/></a>
                        </div>
                    </div>
                    <div className='card-integrante'>
                        <img src={JuanEstebanQuinteroBedoya} alt='home' width='200 px' height='200px'/>
                        <h3> Juan Esteban Quintero</h3>
                        <div className='links-contact'>
                            <a href='https://www.linkedin.com/in/juan-esteban-quintero-bedoya-27828b19b/'><IoLogoLinkedin/></a>
                            <a href="https://github.com/jesteban39"><IoLogoGithub/></a>
                        </div>
                    </div>
                    <div className='card-integrante'>
                        <img src={LeonardoCatto} alt='home' width='200 px' height='200px'/>
                        <h3> Leonardo Catto</h3>
                        <div className='links-contact'>
                            <a href='https://www.linkedin.com/in/leonardocatto96/'><IoLogoLinkedin/></a>
                            <a href="https://github.com/LeoCatto"><IoLogoGithub/></a>
                        </div>
                    </div>
                    <div className='card-integrante'>
                        <img src={MarianoGalli} alt='home' width='200 px' height='200px'/>
                        <h3> Mariano Galli</h3>
                        <div className='links-contact'>
                            <a href='https://www.linkedin.com/in/mariano-galli9/'><IoLogoLinkedin/></a>
                            <a href="https://github.com/marianogalli"><IoLogoGithub/></a>
                        </div>
                    </div>
                    <div className='card-integrante'>
                        <img src={RodrigoAlcino} alt='home' width='200 px' height='200px'/>
                        <h3> Rodrigo Alcino</h3>
                        <div className='links-contact'>
                            <a href='https://www.linkedin.com/in/rodrigoalcino/'><IoLogoLinkedin/></a>
                            <a href="https://github.com/rodriabregu"><IoLogoGithub/></a>
                        </div>
                    </div>
                    {/* <div className='card-integrante'>
                        <img src={WaldoVazquez} alt='home' width='200 px' height='200px'/>
                        <h3> Waldo Vázquez</h3>
                        <div className='links-contact'>
                            <a href='https://www.linkedin.com/in/waldo-leonel-vazquez/'><IoLogoLinkedin/></a>
                            <a href="https://github.com/waldovazquez"><IoLogoGithub/></a>
                        </div>
                    </div> */}
                </div>
        </div>
    )
}

export default ContactUs;