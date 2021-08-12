import './Cart.css';
import {IoTrashOutline} from 'react-icons/io5';

const Cart = () => {
    const cartItems = JSON.parse(localStorage.getItem('products-cart'));
    console.log('cartItems', cartItems)

	const saveToLocalStorage = items => {
		localStorage.setItem('products-cart', JSON.stringify(items));
	};

    const removeCart = cartId => {
        const newAllCart = cartItems.filter(e => e.id !== cartId);
        saveToLocalStorage(newAllCart);
        window.location.reload();
    }

    return (
        <div className='cart'>
            <div>
            { cartItems &&
                cartItems?.map(p => {
                    return (
                        <div className='item'>
                            <form>
                               <div> <img src={p.photo && p.photo[0]?.url} alt='img not found' width='90px' height='90px' /></div>
                                <div className='detalle'>
                                    <div>
                                        <h3>{p.name}, Actual stock: {p.stock}</h3>
                                    </div> 
                                    <div>
                                        <h3>Price: ${p.price}.00</h3>
                                    </div>
                                    <div>{ p.stock < p.value.value ? 
                                        <h4>There is not enough stock of this product. But you can buy {p.stock} if you want, or remove from the cart. 
                                        {<input type='number' max='{p.stock}' value={p.stock} />} </h4>
                                        : <input type='number' min="1" max={p.stock} defaultValue={p.value.value} />
                                        }
                                        <button className='btn-remove' onClick={() => removeCart(p.id)} >Remove <IoTrashOutline/></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
};

export default Cart;