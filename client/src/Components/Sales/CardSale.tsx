import { NavLink as Link } from 'react-router-dom';
import './CardSale.css';
import moment from 'moment';

interface IsaleDetail {
    id: number,
    purchaseId: string,
    userId: number,
    state: string,
    date: string,
    items: any 
};

const CardSale = ({ id, purchaseId, userId, state, date, items}:IsaleDetail) => {
    let itemCount = 0;
    let total = 0;
    items?.forEach((item:any) => {
        itemCount += item.units;
        total += item.units * item.salePrice;
    })

    return (
        <tr>
                {/* <td>{id}</td>
                <td>{userId}</td> */}
                <td>{state}</td>
                <td>{moment(date).format("DD-MM-YYYY HH:mm")}</td>
                <td>{itemCount}</td>
                <td>${total}</td>
                <td><Link to={`/sales/${id}`}>More info</Link></td>
    </tr>
    )
};

export default CardSale;