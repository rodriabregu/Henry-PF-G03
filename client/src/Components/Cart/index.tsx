import { useDispatch, useSelector } from 'react-redux';
import { PostSale } from '../../Redux/Actions/Sales/postSale';
import { updateCart, item } from '../../Redux/Actions/Cart/updateCart';
import { IoTrashOutline } from 'react-icons/io5';
import { state, product } from '../../Redux/Reducers/Reducers'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: state) => state.cart);
  const user:any=useSelector<any>(s=>s.user)
  const url_pago = useSelector((state: state) => state.url_pago);
  const { isAuthenticated } = useAuth0();
  // const { user } = useAuth0<{
  //   name: string, email: string, nickname: string, sub: string
  // }>();

  let total = 0;
  const products: product[] = useSelector((state: state) => {
    return state.AllProducts.filter((product: product) => {
      return items.some((item: item) => {
        if (item.productId === product.id) {
          total += product.price * item.units;
          return true;
        } else return false;
      });
    });
  });

  const removeCart = (removeId: number) => {
    const newItems = items.filter((item: item) => item.productId !== removeId);
    dispatch(updateCart(newItems, user.id));
  };

  const onChangeUnits = (event: any, stock: number) => {
    const id = parseInt(event.target.name);
    let value = parseInt(event.target.value);

    const newItems = items.map((item) => {
      if (item.productId === id) {
        if (value > stock) value = stock;
        if (value <= 0) value = 1;
        item.units = value;
      }
      return item;
    });
    dispatch(updateCart(newItems, user.id));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (items.length > 0) dispatch(PostSale({ userId: user.id, items }));
  };

  return (
    <div className='cart'>
      <div>
        {items &&
          items.map((item) => {
            const product = products.find((product) => product.id === item.productId);
            if (product)
              return (
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
                        <input
                          onChange={(event) => {
                            onChangeUnits(event, product.stock);
                          }}
                          type='number'
                          min={1}
                          max={product.stock}
                          value={item.units}
                          name={`${product.id}`}
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
          {isAuthenticated ? (
            url_pago ? (
              <a href={url_pago}>
                <button
                  onClick={() => dispatch(updateCart([], user.id))}
                  className='btn-confirm'>
                  Confirm purchase
                </button>
              </a>
            ) : (
              items.length > 0 && (
                <form onSubmit={handleSubmit}>
                  <button className='btn-buy'>Confirm payment</button>
                </form>
              )
            )
          ) : items.length > 0 ? (
            <>
              <Link to='/login'>
                Login here to buy!
              </Link>
            </>
          ) : (
            ''
          )}
          <Link to='/home'>
            <button className='btn-backhome'>Back to home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
