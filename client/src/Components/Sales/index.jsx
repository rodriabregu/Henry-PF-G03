import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getSales } from '../../Redux/Actions/Sales/getSale';
import { NavLink as Link } from 'react-router-dom';
import SaleDetail from './saleDetail';

const SalesList = () => {
    const allSales = useSelector(s => s.sales)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSales())
    }, [dispatch])
    return (
        <div>
            <h1>{allSales?.map((e) => {
                return  (
                    <>
                    <SaleDetail
                    key={e.id}
                    id={e.id}
                    purchaseId={e.purchaseId}
                    userId={e.userId}
                    state={e.state}
                    date={e.date}
                    items={e.items}
                    />
                    </>
                )
            })}</h1>
        </div>
    )
};

export default SalesList;