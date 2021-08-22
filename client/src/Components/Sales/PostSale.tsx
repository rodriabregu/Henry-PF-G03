import axios from 'axios'
import { useState } from 'react';
import { useLocation, useParams } from 'react-router'
import './PostSale';
import config from '../../config'
import PaySuccessful from './PaySuccesful';
import ErrorPay from './ErrorPay';

export default function PostSale() {
    const { saleId } = useParams<any>();

    const [sales, setSales] = useState<any>('')

    const { search } = useLocation()

    let saleState: string = ""

    axios.put(`http://${config.REACT_APP_API_URL}:${config.port}/api/sale` + search, {saleId})
            .then(res => {
                saleState = res?.data?.data?.state
                setSales(saleState)
                localStorage.removeItem('products-cart')
                console.log('saleState', res)
            });

    return (
        <div>{
            sales === "Created" ? 
            <div>
                {/* En caso de que el producto haya sido pagado satisfactoriamente */}
                <PaySuccessful />
            </div> : 
            
            <div>
                {/* En caso de estar pendiente o cancelado */}
                <ErrorPay />
            </div>
        }</div>
    )
};