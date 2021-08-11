import { useDispatch } from 'react-redux';
import { TiShoppingCart } from 'react-icons/ti';
import { addActionCart } from '../../Redux/Actions/Products/addingCart'

const AddCart = ({name, stock, price, brand, description, categories}) => {
    const dispatch = useDispatch();
    const product = {
        name,
        stock, 
        price,
        brand,
        description,
        categories,
    };

    const addProduct = () => {
        let products = [];
        if(localStorage.getItem('products-cart')){
            products = JSON.parse(localStorage.getItem('products-cart'));
        }
        products.push(product);
        localStorage.setItem('products-cart', JSON.stringify(products));
    }

    const addCart = product => {
        dispatch(addActionCart(product));
        addProduct();
    };

    return (
        <div>
            <button
                onClick={() => addCart()}>
                Add to cart <TiShoppingCart />
            </button>
        </div>
    )
};

export default AddCart;