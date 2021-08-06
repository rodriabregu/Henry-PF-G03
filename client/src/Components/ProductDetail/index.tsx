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
    const detail = useSelector((s: any) => s.productsDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsDetail(parseInt(id)));
        console.log('detail ',detail)
    }, [dispatch]);

    return (
        <div> 
            <div className='button'>
                <Link to='/home'>
                    <button onClick={dispatch<any>(getProducts())}>
                        Back to home <AiOutlineRollback />
                    </button>
                </Link>
            </div>
            
             <div className='detailgeneral'>
                <div className='product-detail'>
                    <h1 className='title'>{detail.name}</h1>
                    <h2>${detail.price}.00</h2>
                    <h3>Size: {detail.size}</h3>
                    <h3>Review: {detail.review}</h3>
                </div>
                <div className='product-img'><img src={detail.photos?detail.photos[0].url:''} alt='img not found' /></div>
            </div> 

        </div>
    )
}

export default ProductDetail;