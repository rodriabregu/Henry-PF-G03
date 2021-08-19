import './NoAuth.css';
import imageRedCar from './NoAuthRedCar.png'
  
const Noauth = () => {

return (
    <div className='form-register'>
        <div><h1>401 - Unauthorized !</h1></div>
        <div><img src={imageRedCar} alt='img not found' width='100px' height='100px' /></div>
    </div> );
};

export default Noauth;