import './Pay.css';
import {BiCheckCircle} from 'react-icons/bi';

export const PaySuccessful = () => { 
    return (
    <div className='pay'>
      <div className='card-s'>
      <p className='icon-s'><BiCheckCircle/></p>
      <p className='text-s1'>Congrats!</p>
      <p className='text-s2'>Your payment has been made!</p>
      </div>
      </div>
    )}


export default PaySuccessful;