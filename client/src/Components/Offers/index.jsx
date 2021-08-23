import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/Products/getProducts';

const Offers = ({ filterProducts }) => {

    return (
        <div>
            {
                filterProducts?.map(p => {
                    return (
                        <>
                        <span>{p.name}</span>
                        <img src={p.photos[0].url} alt={p.name} />
                        <span>{p.price}</span>
                        </>
                    )
                })
            }
            {console.log('filterProducts', filterProducts)}
        </div>
    )
};

export default Offers;