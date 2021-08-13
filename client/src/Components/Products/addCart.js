import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { TiShoppingCart } from 'react-icons/ti';
import { addActionCart } from '../../Redux/Actions/Products/addingCart'
import '../ProductDetail/productDetail.css';

const AddCart = ({id, name, photo, stock, price, brand, description, categories}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState({ value: 1 })
    const product = {
        id,
        name,
        photo,
        stock, 
        price,
        brand,
        description,
        categories,
        value,
    };

    const addProduct = () => {
        let products = [];
        if(localStorage.getItem('products-cart')){
            products = JSON.parse(localStorage.getItem('products-cart'));
        }
        products.push(product);
        localStorage.setItem('products-cart', JSON.stringify(products));
    };

    const addCart = product => {
        dispatch(addActionCart(product));
        addProduct();
    };

    const handleChange = (e) => {
        setValue({value: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='add-cart'>
            <form onSubmit={handleSubmit} >
            <button className='btn-cart'
                onClick={() => addCart()}>
                Add to cart <TiShoppingCart />
            </button>
                <input type='number' min="1" max={stock} defaultValue='1' onChange={handleChange} />
                <span>$ {value.value * price} </span>
            </form>
        </div>
    )
};

export default AddCart;