import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { TiShoppingCart } from 'react-icons/ti';
import { addActionCart } from '../../Redux/Actions/Products/addingCart'
import toast, { Toaster } from 'react-hot-toast';
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
        value
    };

    const updateStorage = (item) => {
        localStorage.removeItem('products-cart')
        localStorage.setItem('products-cart', JSON.stringify(item));
    }

    const addProduct = () => {
        let products = [];
        if(localStorage.getItem('products-cart')){
            products = JSON.parse(localStorage.getItem('products-cart'));
        }
        const allReadingList = products.find(p => p.id ===  product.id)
        if(allReadingList) {
            allReadingList.value.value += parseInt(value.value)
            updateStorage(products)
        } else {
            products.push(product);
            localStorage.setItem('products-cart', JSON.stringify(products));
        }
    };

    const addCart = product => {
        dispatch(addActionCart(product));
        addProduct();
    };

    const handleChange = (e) => {
        setValue({value: parseInt(e.target.value)});
    };

    const notify = () => toast.success('Successfully review created!');

    const handleSubmit = () => {
        notify()
    };

    return (
        <div className='add-cart'>
            <form onSubmit={handleSubmit} >
            <button className='btn-cart'
                onClick={() => addCart()}>
                Add to cart <TiShoppingCart />
                <Toaster/>
            </button>
                <input type='number' min="1" max={stock} defaultValue='1' onChange={handleChange} />
                <span> ${value.value * price}.00 </span>
            </form>
        </div>
    )
};

export default AddCart;