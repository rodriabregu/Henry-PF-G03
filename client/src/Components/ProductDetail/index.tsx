import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../Redux/Actions/getProducts';
import { getProductsDetail } from '../../Redux/Actions/getProductsDetail';
import { NavLink as Link } from 'react-router-dom';
import { AiOutlineRollback } from 'react-icons/ai';
import './productDetail.css';

type KeyParams = {
    id: string;
  };

const ProductDetail = () => {
    const { id } = useParams<KeyParams>();
    const detail = useSelector((s:any) => s.productsDetail);
    const products:any = useSelector<any>((state) => state.products);
    const dispatch = useDispatch();
    console.log('detail', detail)

    useEffect(() => {
        dispatch(getProductsDetail(dispatch, id));
    }, [dispatch]);

/*     useEffect(() => {
        dispatch(getProducts);
      }, [dispatch]); */

    return (
        <div>
            <div>
                <Link to='/home'>
                    <button onClick={dispatch<any>(getProducts)}>
                        Back to home <AiOutlineRollback />
                    </button>
                </Link>
            </div>
            { detail.map((e:any) => {
                return (
                <div className='detailgeneral'>
                        <h2 className='title'>{e.name.toUpperCase()}</h2>
                        <h2>${e.price}.00</h2>
                        <h3>Size: {e.size.toUpperCase()}</h3>
                        <h3>Review: {e.review}</h3>
                        <h3><img src={e.img} alt='img not found'/></h3>
                    </div>         
                )
            })}
            
        </div>
    )
}

export default ProductDetail;