import { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getSales } from '../../Redux/Actions/Sales/getSale';
import CardSale from './CardSale';
import './allSales.css';

const SalesList = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);
    const allSales = useSelector(s => s.sales);

    const handleChange = e => {
        let filterState = []
        if (e.target.value === '---') return setFilter(allSales)
        if (e.target.value === 'Pending' ||
            e.target.value === 'Created' ||
            e.target.value === 'Processing' ||
            e.target.value === 'Complete' ||
            e.target.value === 'Cancelled') {
        filterState = allSales.filter( c => c.state === e.target.value)
            return setFilter(filterState)
        }
    };

    useEffect(() => {
        dispatch(getSales())
    }, [dispatch]);

    return (
        <div>
            <h1>
            <div>
                <select onChange={handleChange}>
                    <option value='---'>State by:</option>
                    <option value='Pending'> Pending </option>
                    <option value='Created'> Created </option>
                    <option value='Processing'> Processing </option>
                    <option value='Complete'> Complete </option>
                    <option value='Cancelled'> Cancelled </option>
                </select>
            </div>
                { filter.length >= 1 ?
                    filter?.map( e => {
                    return  (
                    <>
                    <div className='allSheet'>
                        <CardSale
                        key={e.id}
                        id={e.id}
                        purchaseId={e.purchaseId}
                        userId={e.userId}
                        state={e.state}
                        date={e.date}
                        items={e.items}
                        />
                    </div>
                    </>
                    )
                    })
                    : 
                    allSales?.map( e => {
                        return (
                        <>
                        <div className='allSheet'>
                            <CardSale
                            key={e.id}
                            id={e.id}
                            purchaseId={e.purchaseId}
                            userId={e.userId}
                            state={e.state}
                            date={e.date}
                            items={e.items}
                            />
                        </div>
                        </>
                        )
                    })
                }
            </h1>
        </div>
    )
};

export default SalesList;