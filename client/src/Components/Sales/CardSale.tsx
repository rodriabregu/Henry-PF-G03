import {NavLink as Link } from 'react-router-dom';
import './CardSale.css';

type KeyParams = {
    id: string;
};
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
        <div className='cardSale'>
            <Link to={`/sales/${id}`}>
            <span>{id}{<br/>}</span>
            </Link>
            <span>{purchaseId}{<br/>}</span>
            <span>{userId}{<br/>}</span>
            <span>{state}{<br/>}</span>
            <span>{date}{<br/>}</span>
        </div>
    )
}

export default CardSale;
