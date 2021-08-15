import axios from 'axios'
import { useState } from 'react';
import { useLocation, useParams } from 'react-router'

export default function PostSale() {

    const { id, saleId, esta } = useParams<any>();

    const [ sales, setSales ] = useState<any>('')

    const {search} = useLocation()

    let saleState: string = ""

    axios.put(`http://localhost:3001/sale`+search, {saleId})
            .then(res => {
              saleState = res?.data?.data?.state
              setSales(saleState)
              localStorage.removeItem('products-cart')
              console.log('saleState',saleState)
            })
            

    return (
        <div>
            <h1>saleId: {saleId}</h1>
                <h1>saleState: {sales?sales:''}</h1>
                <p>search: {search}</p>
        </div>
    )
}