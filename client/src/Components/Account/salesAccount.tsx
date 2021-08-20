import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSales } from '../../Redux/Actions/Sales/getSale';

const SalesAccount = () => {
    const dispatch = useDispatch()
    const { id } = useParams<any>();
    const allSales:any = useSelector<any>(s => s.sales)
    const filterUser = allSales.filter((f:any) => f.userId === id);

    useEffect( () => {
        dispatch(getSales())
    }, []);

    return (
        <div>
            {
                filterUser.map((f:any) => {
                    return ( 
                        <span>{f}</span>
                    )
                })
            }
        </div>
    )
};

export default SalesAccount;