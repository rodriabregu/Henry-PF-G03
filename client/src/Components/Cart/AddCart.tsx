import { useDispatch, useSelector } from 'react-redux';
import { TiShoppingCart } from 'react-icons/ti';
import { updateCart, } from '../../Redux/Actions/Cart/updateCart';
import { state, item, product } from '../../typesApp'
import { useAuth0 } from '@auth0/auth0-react';
import '../ProductDetail/productDetail.css';

export const AddCart = (props: { product: product }) => {

  const { product } = props
  const dispatch = useDispatch();
  const { user } = useAuth0<{ sub: string }>();
  const items: item[] = useSelector((state: state): item[] => state.cart);
  const current: item = items.find((item: item) => item.productId === product.id) || { productId: product.id, units: 0 };

  const addCart = (/* event */) => {
    if (current.units < product.stock) {
      const newItems: item[] = items.filter(
        (item: item) => item.productId !== current.productId
      );
      current.units += 1;
      newItems.push(current);
      dispatch(updateCart(newItems, user?.sub));
    }
  };

  const handleUnits = (event: any) => {
    let value = parseInt(event.target.value);
    if (value > product.stock) value = product.stock;
    if (value <= 0) value = 1;
    current.units = value;
    const newItems = items.filter((item) => item.productId !== current.productId);
    newItems.push(current);
    dispatch(updateCart(newItems, user?.sub));
  };

  return (
    <div className='add-cart'>
      <div>
        <button className='btn-cart' onClick={addCart}>
          Add to cart
          <TiShoppingCart />
        </button>
        {current.units > 0 && (
          <input
            type='number'
            min={1}
            max={product.stock}
            value={current.units}
            onChange={handleUnits}
          />
        )}
        {current.units > 0 && <span> ${current.units * product.price}.00 </span>}
      </div>
    </div>
  );
};