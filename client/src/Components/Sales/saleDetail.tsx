import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {NavLink as Link } from 'react-router-dom';

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

const SaleDetail = ({ id, purchaseId, userId, state, date, items}:IsaleDetail) => {
    

    return (
        <div>
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

export default SaleDetail;
