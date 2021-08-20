import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiShoppingCart } from 'react-icons/ti';
//import { addActionCart } from '../../Redux/Actions/Products/addingCart';
import { updateCart } from '../../Redux/Actions/Cart/updateCart';
import toast, { Toaster } from 'react-hot-toast';
import '../ProductDetail/productDetail.css';

const AddCart = ({ id, stock, price, name, photo, brand, description, categories }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  let current = items.find((item) => item.productId === id);
  if (!current) current = { productId: id, units: 0 };
  //const [value, setValue] = useState({ value: 1 });
  //const [units, setUnits] = useState(1);
  //const [isInCart, setIsInCart] = useState(items.some((item) => item.productId === id));

  /* 
  const product = {
    id,
    //name,
    //photo,
    stock,
    price,
    //brand,
    //description,
    //categories,
    //value,
  };

  const updateStorage = (item) => {
    localStorage.removeItem('products-cart');
    localStorage.setItem('products-cart', JSON.stringify(item));
  };
  const addProduct = () => {
    let products = [];
    if (localStorage.getItem('products-cart')) {
      products = JSON.parse(localStorage.getItem('products-cart'));
    }
    const allReadingList = products.find((p) => p.id === product.id);
    if (allReadingList) {
      allReadingList.value.value += parseInt(value.value);
      updateStorage(products);
    } else {
      products.push(product);
      localStorage.setItem('products-cart', JSON.stringify(products));
    }
  };
 */
  const addCart = (/* event */) => {
    //dispatch(addActionCart(product));
    //addProduct();
    /* if (!item) {
      items.push({ productId: id, units });
      setIsInCart(true);
      dispatch(updateCart(items));
    } else if (isInCart && units < stock) {
      setUnits((state) => units + 1);
      const newItems = items.map((item) => {
        if (item.productId === id) item.units = units + 1;
        return item;
      });
      dispatch(updateCart(newItems));
    } */
    if (current.units < stock) {
      const newItems = items.filter((item) => item.productId !== current.productId);
      current.units += 1;
      newItems.push(current);
      dispatch(updateCart(newItems));
    }
  };

  const handleChange = (event) => {
    /* const value = parseInt(event.target.value);
    //setUnits((state) => value);
    const newItems = items.map((item) => {
      if (item.productId === id) item.units = value;
      return item;
    });
    dispatch(updateCart(newItems)); */
    let value = parseInt(event.target.value);
    if (value > stock) value = stock;
    if (value <= 0) value = 1;
    current.units = value;
    const newItems = items.filter((item) => item.productId !== current.productId);
    newItems.push(current);
    dispatch(updateCart(newItems));
  };

  /* 
  const handleChange = (e) => {
    setValue({ value: parseInt(e.target.value) });
  };

    const notify = () => toast.success('Successfully review created!');

    const handleSubmit = () => {
        notify()
    };
 */
  return (
    <div className='add-cart'>
      {/* <div onSubmit={handleSubmit} > */}
      <div>
        <button className='btn-cart' onClick={addCart}>
          Add to cart
          <TiShoppingCart />
          <Toaster />
        </button>
        {current.units > 0 && (
          <input
            type='number'
            min={1}
            max={stock}
            value={current.units}
            onChange={handleChange}
          />
        )}
        {current.units > 0 && <span> ${current.units * price}.00 </span>}
      </div>
    </div>
  );
};

export default AddCart;
