import { useDispatch, useSelector } from 'react-redux';
import { TiShoppingCart } from 'react-icons/ti';
import { updateCart, } from '../../Redux/Actions/Cart/updateCart';
import { state, item, product } from '../../typesApp'
import { useAuth0 } from '@auth0/auth0-react';
import '../ProductDetail/productDetail.css';
import './Cart.css';

export const UpdateCart = (
  props: { product: product, showUnits: boolean }
) => {

  const { product, showUnits } = props
  const dispatch = useDispatch();
  const { user } = useAuth0<{ sub: string }>();
  const items: item[] = useSelector((state: state): item[] => state.cart);
  const current: item =
    items.find((item: item) => item.productId === product.id)
    || { productId: product.id, units: 0 }

  const addCart = (/* event */) => {
    dispatch(updateCart(
      [...items, { productId: product.id, units: 1 }],
      user?.sub
    ));
  };

  const dropCart = (/* event */) => {
    dispatch(updateCart(items.filter(
      (item: item) => item.productId !== current.productId
    ), user?.sub));
  };

  const handleUnits = (event: any) => {
    let value = parseInt(event.target.value);
    if (value > product.stock) value = product.stock;
    if (value <= 0) value = 1;
    current.units = value;
    const newItems = items.filter(
      (item) => item.productId !== current.productId
    );
    newItems.push(current);
    dispatch(updateCart(newItems, user?.sub));
  };

  return (<>
    {
      current.units === 0 ?
        <button className='btn-addc' onClick={addCart}>
          Add to cart <TiShoppingCart />
        </button>
        :
        <button className='btn-removecart' onClick={dropCart}>
          Remove <TiShoppingCart />
        </button>
    }
    {
      showUnits && current.units > 0 ?
        <div className='add-cart'>
          <input
            type='number'
            value={current.units}
            onChange={handleUnits}
          />
          <span> ${current.units * product.price}.00 </span>
        </div>
        :
        <></>
    }
  </>
  );
};
