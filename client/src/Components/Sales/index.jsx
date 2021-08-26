import { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getSales } from '../../Redux/Actions/Sales/getSale';
import CardSale from './CardSale';
import './allSales.css';
import { NavLink as Link } from 'react-router-dom';
import {FiArrowLeftCircle} from 'react-icons/fi';

const SalesList = () => {
    const dispatch = useDispatch();
    const allSales = useSelector(s => s.sales);
    const [filter, setFilter] = useState(allSales);

    const handleChange = e => {
        let filterState = []
        if (e.target.value === '---') return setFilter(allSales)
        if (['Pending', 'Created', 'Processing', 'Complete', 'Cancelled'].indexOf(e.target.value) !== -1) {
        filterState = allSales.filter( c => c.state === e.target.value )
            return setFilter(filterState)
        }
    };

    useEffect(() => {
        dispatch(getSales());
        setFilter(allSales);
    }, [allSales.length]);

    return (
        <div className='back-sales'>
            <div className='div-btn-filter'>
            <div className='filtro-sales'>
                <select onChange={handleChange}>
                    <option value='---'>Filter state by:</option>
                    <option value='Pending'> Pending </option>
                    <option value='Created'> Created </option>
                    <option value='Processing'> Processing </option>
                    <option value='Complete'> Complete </option>
                    <option value='Cancelled'> Cancelled </option>
                </select>
            </div>
        </div>
                <div className='cardSale'>
                <table>
                    <tr>
                        {/* <th>Sell ID</th>
                        <th>User ID</th> */}
                        <th>State</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Details</th>
                    </tr>
                { filter.length >= 1 ?
                filter?.map( e => {
                    return (
                    <>
                        <CardSale
                        key={e.id}
                        id={e.id}
                        purchaseId={e.purchaseId}
                        userId={e.userId}
                        state={e.state}
                        date={e.date}
                        items={e.items}
                    /></>
                    )
                })
                    : <h4>No sales 😥</h4>
                }
                </table>
                </div>
                        <Link to='/adashboard' style={{ textDecoration: 'none' }}>
                        <button className='btn-dash'> <FiArrowLeftCircle/> Dashboard</button>
        </Link>
        </div>
    )
};

export default SalesList;