import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {IoTrashOutline} from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import { PostSale } from '../../Redux/Actions/Sales/postSale';
import { getSales } from '../../Redux/Actions/Sales/getSale'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom"
import './Cart.css';

const notify = () => toast.success('Successfully buy!');

const id = uuidv4();

const Cart = () => {
    const dispatch = useDispatch();
    const allSales = useSelector(s => s.sales);
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
        /* "purchaseId": id */
    }

    /* let history = useHistory() */
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(PostSale(dispatchSale))
        const match = allSales?.map(s => s.data.data)
        const matchFilter = match.filter(m => m.userId === 1)

        /* history.push("/home") */
        /* notify() */
    }

    console.log('allSales', allSales)

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
                                <div> <img src={p.photo && p.photo[0]?.url} alt='img not found' width='90px' height='90px' /></div>
                                <div className='detalle'>
                                    <div>
                                        <h3>{p.name}</h3>
                                        <h4>Actual stock: {p.stock}</h4>
                                    </div> 
                                    <div>
                                        <h3>Price: ${p.price}.00 (total: ${p.price * p.value.value}.00)</h3>
                                    </div>
                                    <div>{ p.stock < p.value.value ? 
                                        <h4>There is not enough stock of this product. But you can buy {p.stock} if you want, or remove from the cart. 
                                        {<input type='number' max='{p.stock}' value={p.stock} />} </h4>
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
                <div>
                    <h3>Subtotal to pay: ${sumAll}.00</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <button>Buy</button>
                    <Toaster />
                </form>
            </div>
        </div>
    )
};

export default Cart;