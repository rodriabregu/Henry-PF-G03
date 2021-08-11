import React from 'react'

const Cart = () => {
    const cartItems = JSON.parse(localStorage.getItem('products-cart'));
    
    return (
        <div>
            { cartItems &&
                cartItems?.map(p => {
                    return (
                        <div>
                        <span>{p.name}, Price: {p.price}, Actual stock: {p.stock}</span>
                        </div>
                    )
                })
            }
            {console.log(cartItems)}
        </div>
    )
};

export default Cart;