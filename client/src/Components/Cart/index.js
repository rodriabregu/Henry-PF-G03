import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostSale } from '../../Redux/Actions/Sales/postSale';
import { getSales } from '../../Redux/Actions/Sales/getSale';
import { IoTrashOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import './Cart.css';

import { updateCart } from '../../Redux/Actions/Cart/updateCart';

const Cart = () => {
  //const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  //const products = useSelector((state) => state.AllProducts);
  //const allSales = useSelector((state) => state.sales);
  //const [salePurchaseId, setSalePurchaseId] = useState('');
  //const [items, setItems] = useState([]);
  //const [total, setTotal] = useState(0);
  //const [items, setItems] = useState(cart);
  const url_pago = useSelector((state) => state.url_pago);

  let total = 0;
  const products = useSelector((state) => {
    return state.AllProducts.filter((product) => {
      return items.some((item) => {
        if (item.productId === product.id) {
          total += product.price * item.units;
          return true;
        } else return false;
      });
    });
  });

  /* const saveToLocalStorage = items => {
		localStorage.setItem('products-cart', JSON.stringify(items));
	}; */

  const removeCart = (removeId) => {
    //const newAllCart = items.filter((event) => event.id !== cartId);
    //saveToLocalStorage(newAllCart);
    //window.location.reload();
    console.log('items ', items);
    const newItems = items.filter((item) => item.productId !== removeId);
    console.log('newItems ', newItems);
    //setItems(newItems);
    dispatch(updateCart(newItems));
  };

  /* 
  const sumAll = items
    ?.map((item) => item.price * item.value.value)
    .reduce((prev, curr) => prev + curr, 0);
  */

  const onChangeUnits = (event, stock) => {
    //const { value, name } = event.target;
    const id = parseInt(event.target.name);
    let value = parseInt(event.target.value);
    /* 
    const copiaItems = [...items];
    const findItem = copiaItems.find((c) => c.id === parseInt(name));
    findItem.value.value = parseInt(value);
    setItems(copiaItems);
    saveToLocalStorage(copiaItems);
     */
    const newItems = items.map((item) => {
      if (item.productId === id) {
        if (value > stock) value = stock;
        item.units = value;
      }
      return item;
    });
    //setItems(newItems);
    dispatch(updateCart(newItems));
  };
  /* 
  const dispatchSale = {
    userId: 1,
    items: items,
    purchaseId: uuidv4(),
  };
  const notify = () => toast.error('The cart is empty.');

 */
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (items.length > 0) dispatch(PostSale({userId: 1, items}));
  };

  /* 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (items.length <= 0) return notify();
    dispatch(PostSale());

    dispatch(PostSale(dispatchSale));
    setSalePurchaseId(dispatchSale);
    const match = allSales?.map((s) => s?.data?.data);
    const matchFilter = match?.filter(
      (m) => m?.sale?.purchaseId === salePurchaseId?.purchaseId,
    );
    const matchUrl = matchFilter[0]?.response?.body?.init_point;
    console.log('matchUrl', allSales);
  
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('products-cart'))?.map((c) => {
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
      };
    });
    //setItems(cartItems);
    getSales();
  }, []);
 */

  return (
    <div className='cart'>
      <div>
        { items &&
          items.map((item) => {
            const product = products.find((product) => product.id === item.productId);

            if( product ) return (
              <div className='item'>
                <form>
                  <div className='detalle'>
                    <img
                      src={product.photos[0].url}
                      alt='img not found'
                      width='90px'
                      height='90px'
                    />
                    <div className='name-prod'>
                      <h5>Price: ${product.price}.00 </h5>
                      <h5>{product.name}</h5>
                      <h5>Actual stock: {product.stock}</h5>
                    </div>
                    <div className='price-prod'>
                      <h5>(total: ${product.price * item.units}.00)</h5>
                      {/*  product.stock < item.units ? (
                        <h5>
                          There is not enough stock of this product. But you can buy{' '}
                          {product.stock} if you want, or remove from the cart.
                          {
                            <input
                              type='number'
                              max='{product.stock}'
                              value={product.stock}
                            />
                          }{' '}
                        </h5>
                      ) :  (
                        <input
                          onChange={onChangeUnits}
                          type='number'
                          min={1}
                          max={product.stock}
                          value={item.units}
                          name={product.id}
                        />
                      ) */}
                      <input
                        onChange={(event) => {
                          onChangeUnits(event, product.stock);
                        }}
                        type='number'
                        min={1}
                        max={product.stock}
                        value={item.units}
                        name={product.id}
                      />
                      <button
                        className='btn-remove'
                        onClick={(event) => {
                          event.preventDefault();
                          removeCart(product.id);
                        }}>
                        Remove <IoTrashOutline />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            );
          })}
        <div className='buy'>
          <h3>Subtotal to pay: ${total}.00</h3>
          <form onSubmit={handleSubmit}>
            {!url_pago ? <button className='btn-buy'>Confirm payment</button> : ''}
            <Toaster />
          </form>
          {url_pago && (
            <a href={url_pago}>
              <button className='btn-confirm'>Confirm purchase</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
