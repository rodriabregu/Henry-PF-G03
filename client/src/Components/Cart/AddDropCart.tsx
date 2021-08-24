import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { updateCart, } from '../../Redux/Actions/Cart/updateCart';
import { state, item, product } from '../../typesApp'
import { useAuth0 } from '@auth0/auth0-react';
import { IoTrashOutline } from 'react-icons/io5';
import '../ProductDetail/productDetail.css';
import './Cart.css';

export const AddDropCart = (props: { product: product }) => {

  const { product } = props
  const dispatch = useDispatch();
  const { user } = useAuth0<{ sub: string }>();
  const items: item[] = useSelector((state: state): item[] => state.cart);
  const actual: item =
    items.find((item: item) => item.productId === product.id)
    || { productId: product.id, units: 0 }
  const [current,setCurretn] = useState(actual)

  const handleCart = (/* event */) => {
    if (current.units > 0) {
      dispatch(updateCart(items.filter(
        (item: item) => item.productId === current.productId
      ), user?.sub));
      setCurretn({ productId: product.id, units: 0 })
    } else if (product.stock > 0) {
      current.units = 1;
      items.push(current);
      dispatch(updateCart(items, user?.sub));
      setCurretn({ productId: product.id, units: 1 })
    }
  };

  return (
    current.units > 0 ?
      <button className='btn-remove' onClick={handleCart}>
        Remove to cart <IoTrashOutline />
      </button>
      : <button className='btn-cart' onClick={handleCart}>
        Add to cart <TiShoppingCart />
      </button>

  )

}