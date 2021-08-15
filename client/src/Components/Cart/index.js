import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostSale } from '../../Redux/Actions/Sales/postSale';
import { getSales } from '../../Redux/Actions/Sales/getSale'
import { IoTrashOutline } from 'react-icons/io5';
import { useHistory } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import './Cart.css';

const Cart = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const allSales = useSelector(s => s.sales);
    const [salePurchaseId, setSalePurchaseId] = useState('');
    const [items, setItems] = useState([]);

	const saveToLocalStorage = items => {
		localStorage.setItem('products-cart', JSON.stringify(items));
	};

    const removeCart = cartId => {
        const newAllCart = items.filter(e => e.id !== cartId);
        saveToLocalStorage(newAllCart);
        window.location.reload();
    };

    const sumAll = items?.map(item => item.price * item.value.value).reduce((prev, curr) => prev + curr, 0);

    const onChangeInput = (e) => {
        const {value, name} = e.target; 
        const copiaItems = [...items]
        const findItem = copiaItems.find((c) => c.id === parseInt(name))
        findItem.value.value = parseInt(value);
        setItems(copiaItems)
        saveToLocalStorage(copiaItems)
    };

    const dispatchSale = {
        "userId": 1,
        "items": items,
        "purchaseId": uuidv4()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(PostSale(dispatchSale))
        setSalePurchaseId(dispatchSale)
        const match = allSales?.map(s => s?.data?.data)
        const matchFilter = match?.filter(m => m?.sale?.purchaseId === salePurchaseId?.purchaseId)
        const matchUrl = matchFilter[0]?.response?.body?.init_point;
        console.log('matchUrl',matchUrl)
        /* history.push(matchUrl); */ 
    }

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('products-cart'))?.map( c => {
            return {
                name: c.name,
                price: c.price,
                stock: c.stock,
                id: c.id,
                brand: c.brand,
                photo: c.photo,
                description: c.description,
                value: c.value,
                categories: c.categories,
                productId: c.id,
                units: c.value.value,
            }
        });
        setItems(cartItems)
        getSales()
    }, [])

    return (
        <div className='cart'>
            <div>
            { items &&
                items?.map( p => {
                    return (
                        <div className='item'>
                            <form>
                            <div className='detalle'>
                                <img src={p.photo && p.photo[0]?.url} alt='img not found' width='90px' height='90px' />
                                    <div className='name-prod'>
                                        <h5>Price: ${p.price}.00 </h5>
                                        <h5>{p.name}</h5>
                                        <h5>Actual stock: {p.stock}</h5>
                                    </div> 
                                    <div className='price-prod'>
                                        <h5>(total: ${p.price * p.value.value}.00)</h5>
                                    { p.stock < p.value.value ? 
                                        <h5>There is not enough stock of this product. But you can buy {p.stock} if you want, or remove from the cart. 
                                        {<input type='number' max='{p.stock}' value={p.stock} />} </h5>
                                        : <input onChange={onChangeInput} type='number' min="1" max={p.stock} value={p.value.value} name={p.id} />
                                    }
                                        <button className='btn-remove' onClick={() => removeCart(p.id)}>Remove <IoTrashOutline/></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                })
            }
                <div className='buy'>
                    <h3>Subtotal to pay: ${sumAll}.00</h3>
                
                    <form onSubmit={handleSubmit}>
                        <button className='btn-buy'>Buy</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Cart;