import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsDetail } from '../../Redux/Actions/Products/getProductsDetail';
import './productDetail.css';

type KeyParams = {
    id: string;
};

const ProductDetail = () => {
    const { id } = useParams<KeyParams>();
    const detail = useSelector((s: any) => s.productsDetail);
    const dispatch = useDispatch();


    const [photo, setPhoto] = useState(0);

    const changePhoto=(e:any)=>{
        const action=e.target.name;
        if( action === 'next' ){
            if( photo < detail.photos.length - 1 ){
                setPhoto(photo+1)
            }
        } else {
            if( photo > 0 ) {
                setPhoto(photo-1)
            }
        }
    };

    useEffect(() => {
        dispatch(getProductsDetail(parseInt(id)));
        console.log('detail', detail)
    }, [dispatch]);

    return (
        <div>
            <div className='detailgeneral'>
                <button name='prev' onClick={changePhoto}>Anterior</button>
                <button name='next' onClick={changePhoto}>Siguiente</button>
                <div className='product-detail'>                
                    <h1 className='title'>{detail.name}</h1>
                    <h2>${detail.price}.00</h2>
                    <h3>Size: {detail.size}</h3>
                    <h3>Review: {detail.review}</h3>
                </div>
                <div>
                    {
                        detail.photos?detail.photos.map((f:any) => <img src={f.url} width='50px'/>):''
                    }
                </div>
                <div className='product-img'>
                    <img src={detail.photos ? detail.photos[photo].url : ''} alt={detail.name} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;