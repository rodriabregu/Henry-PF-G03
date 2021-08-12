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
    };

    return (
        <div>
            { cartItems &&
                cartItems?.map(p => {
                    return (
                        <div>
                            <form>
                                <h2>{p.name}, Price: {p.price}, Actual stock: {p.stock}</h2>
                                <img src={p.photo && p.photo[0]?.url} alt='img not found' width='90px' height='90px' />
                                { p.stock < p.value.value ? 
                                <h3>There is not enough stock of this product. But you can buy {p.stock} if you want, or remove from the cart. 
                                {<input type='number' max='{p.stock}' value={p.stock} />} </h3>
                                : <input type='number' min="1" max={p.stock} defaultValue={p.value.value} />
                                }
                                <button onClick={() => removeCart(p.id)} >Remove from cart</button>
                            </form>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Cart;