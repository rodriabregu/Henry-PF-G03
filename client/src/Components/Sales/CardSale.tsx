import { NavLink as Link } from 'react-router-dom';
import './CardSale.css';

interface IsaleDetail {
    id: number,
    purchaseId: string,
    userId: number,
    state: string,
    date: string,
    items: any 
}

const CardSale = ({ id, purchaseId, userId, state, date, items}:IsaleDetail) => {
    return (
    <Link style={{ textDecoration: 'none', color: 'white' }} to={`/sales/${id}`}>
        <div className='cardSale'>
            <span>Sell id: {id}{<br/>}</span>
            <span>User id: {userId}{<br/>}</span>
            <span>State: {state}{<br/>}</span>
            <span>Date: {date}{<br/>}</span>
            {/* <span>Items: {items.map((i:any) => <span>{...i}</span>)}</span> */}
        </div>
    </Link>
    )
};

export default CardSale;