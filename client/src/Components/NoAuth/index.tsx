import imageRedCar from './NoAuthRedCar.png';
import './NoAuth.css';

const Noauth = () => {

return (
    <div className='form-register'>
        <div className='noauth'><h1>401 - </h1><h1> Unauthorized !</h1></div>
        <div className='img-card'><img src={imageRedCar} alt='img not found' width='100px' height='100px' /></div>
    </div> );
};

export default Noauth;