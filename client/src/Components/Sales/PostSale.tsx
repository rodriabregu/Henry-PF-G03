import axios from 'axios'
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom';
import config from '../../config'
import PaySuccessful from './PaySuccesful';
import ErrorPay from './ErrorPay';
import './PostSale.css';


export default function PostSale() {
  const { saleId } = useParams<any>();
  const [sales, setSales] = useState<any>('')
  const { search } = useLocation()

  useEffect(() => {
    let saleState: string = ""
    axios.put(`http://${config.REACT_APP_API_URL}:${config.port}/api/sale` + search, { saleId })
      .then(res => {
        saleState = res?.data?.data?.state
        setSales(saleState)
        console.log('saleState', saleState)
        console.log('estado de la compra ', sales)
      });
  },[sales])

  return (
    <div className="div-postSale">
      {
        sales === "Created" ?
          <div>
            {/* En caso de que el producto haya sido pagado satisfactoriamente */}
            <PaySuccessful />
          </div>
          :
          <div>
            {/* En caso de estar pendiente o cancelado */}
            <ErrorPay />
          </div>
      }
      <div className='div-btnhome'>
        <Link to='/home'>
          <button className='backhome'>Back to home</button>
        </Link>
      </div>
    </div>
  )
};