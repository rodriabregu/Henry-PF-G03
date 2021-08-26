import './Pay.css';
import {MdErrorOutline} from 'react-icons/md';


export const ErrorPay = () => { 
    return (
    <div className='errorpay'>
        <div className='card-error'>
      <p className='icon-x'><MdErrorOutline/></p>
      <p className='text-error1'>An error has occurred.</p>
      <p className='text-error2'>The payment couldn't be made.</p>
      </div>
      </div>
    )}


export default ErrorPay;