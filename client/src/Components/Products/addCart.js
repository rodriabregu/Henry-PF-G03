import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addActionCart } from '../../Redux/Actions/Products/addingCart'

const AddCart = ({name, stock, price, brand, description, categories}) => {
	const [cart, setCart] = useState([]);
    const dispatch = useDispatch();
    const allCart = useSelector(s => s.cartProducts)
    const product = {
        name,
        stock, 
        price,
        brand,
        description,
        categories,
    }

	const saveToLocalStorage = items => {
        let arrayProduct = localStorage.getItem('product-add')
        
		localStorage.setItem('product-add', JSON.stringify(items));
	};

/*      const addCart = () => { */
        /* const newAddCart = [product]; */
/*         setCart(product);
        dispatch(addActionCart(cart));
        saveToLocalStorage(allCart);
    } */ 

    const addCart = (product) => {
/*         const newAddCart = [...cart, product];
        setCart(newAddCart); */
        console.log(product)
        dispatch(addActionCart(product));
        saveToLocalStorage(allCart);
    }

    return (
        <div>
            <button
                onClick={() => addCart(product)}>
                add to cart
            </button>
        </div>
    )
};

export default AddCart;