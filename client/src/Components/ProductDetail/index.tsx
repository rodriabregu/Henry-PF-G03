import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../Redux/Actions/Products/getProducts';
import { getProductsDetail } from '../../Redux/Actions/Products/getProductsDetail';
import { NavLink as Link } from 'react-router-dom';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
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
        console.log('detail ', detail)
    }, [dispatch]);

    const [photo, setPhoto] = useState(0);

    const changePhoto=(e:any)=>{
        const action=e.target.name;
        if(action==='next'){
            if(photo<detail.photos.length-1){
                setPhoto(photo+1)
            }
        }else{
            if(photo>0){
                setPhoto(photo-1)
            }
        }
        
    }

    return (
        <div>
            <div className='product-detail'>
                <div className='product-img'>
                    <img src={detail.photos ? detail.photos[photo].url : ''} alt='img not found' />
                </div>
                <div className='detail'>
                    <h1>{detail.name}</h1>
                    <h2>${detail.price}.00</h2>
                    <h3>Size: {detail.size}</h3>
                    <h3>Review: {detail.review}</h3>
                    <div className='subdetail'>
                    <button name='prev' onClick={changePhoto}><GoArrowLeft/></button>
                    {detail.photos?detail.photos.map((f:any)=><img src={f.url} width='50px' height='50px'></img>):''}
                    <button name='next' onClick={changePhoto}><GoArrowRight/></button>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ProductDetail;