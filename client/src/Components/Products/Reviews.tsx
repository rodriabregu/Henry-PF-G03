import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink as Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { getProductsDetail } from '../../Redux/Actions/Products/getProductsDetail';
import { state, product, photo, productNull } from '../../typesApp'

import { AddCart } from '../Cart/AddCart'
import toast, { Toaster } from 'react-hot-toast';
import config from '../../../src/config';
import './productDetail.css';

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

const ProductDetail = (props: any) => {
  const productId = parseInt(props.match.params.productId)
  const dispatch = useDispatch();  
  const user = useSelector((state: state) => state.user);
  //const { id } = useParams<{ id: string }>();
  const [container, setContainer] = useState<any>()
  const [photo, setPhoto] = useState(0);
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(true);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)
  const { handleSubmit } = useForm();
  const product: product = useSelector(
    (state: state) => state.products.find(
      (product: product) => product.id === productId
    )
  ) || productNull
  const [review, setReview] = useState({
    text: '',
    stars: 0,
    ProductId: 0,
  });

  function handleReview(e: any) {
    setReview({
      text: e.target.value,
      stars: currentValue,
      ProductId: product.id
    });
  };

  const notify = () => toast.success('Successfully review created!');

  const onSubmit = async () => {
    await axios.post(`http://${config.REACT_APP_API_URL}:3001/api/reviews`, review);
    notify();
  };

  const changePhoto = (e: any) => {
    const action = e.target.name;
    if (action === 'next') {
      if (photo < product.photos.length - 1) {
        setPhoto(photo + 1)
      }
    } else {
      if (photo > 0) {
        setPhoto(photo - 1)
      }
    }
  };

  const changeFlag = () => {
    setShow(!show)
  };

  const changeEditing = () => {
    setShow2(!show2)
  };


  const handleClick = (value: any) => {
    setCurrentValue(value)
  };

  const handleMouseOver = (newHoverValue: any) => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  };

  useEffect(() => {
    dispatch(getProductsDetail(productId));
    const res: any = axios.get<any>(
      `http://${config.REACT_APP_API_URL}:3001/api/reviews/${productId}`
      )
      .then(res => {
        setContainer(res.data)
      })
  }, [dispatch, productId]);

  return (
    <div>
      <div className='product-detail'>
        <div className='imgs'>
          <Link to='/home'><button className='btn-back'>Back to page</button></Link>
          <div className='product-img'>
            <img src={product.photos[photo]?.url} alt='img not found' width='380px' height='380px' />
          </div>
          <div className='subdetail'>
            <button name='prev' onClick={changePhoto}>{`<`}</button>
            {product.photos.map((f: photo) =>
              <img src={f.url} width='50px' height='50px' alt='not found' />
            )}
            <button name='next' onClick={changePhoto}>{`>`}</button>
          </div>
        </div>
        <div className='detail'>
          <button className='btn-edit' onClick={changeEditing}>Edit product</button>
          {show2 ?
            <div>
              <h1>{product.name}</h1>
              <h2>${product.price}.00</h2>
              <h3>{product.description}</h3>
              <h3>Stock:{product.stock <= 0 ? <span>No disponible</span> : product.stock}</h3>
              <h3>Brand: {product.brand.name}</h3>
              <AddCart product={product} />
              <h3>Review: {review.text}</h3>
              {
                container?.map((r: any) => {
                  return (
                    <div><span>{r.text} {r.stars}</span></div>
                  )
                })
              }
              <div className='form-review'>
                <button className='btn-review' onClick={changeFlag}>Write review</button>
                {show &&
                  <div>
                    <h3> Write a review and rating </h3>
                    <form>
                      <div>
                        {stars.map((_, index) => {
                          return (
                            <FaStar
                              key={index}
                              size={24}
                              onClick={() => handleClick(index + 1)}
                              onMouseOver={() => handleMouseOver(index + 1)}
                              onMouseLeave={handleMouseLeave}
                              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                              style={{ marginRight: 10, cursor: "pointer" }} />
                          )
                        })}
                      </div>
                      <div className='add-review'>
                        <textarea className='text-add'
                          name="review"
                          placeholder="Enter the description review..."
                          onChange={handleReview} />
                        <button className='btn-addreview' onClick={handleSubmit(onSubmit)} >
                          Submit
                        </button>
                      </div>
                      <Toaster />
                    </form>
                  </div>
                }
              </div>
            </div>
            :
            <></>
          }
        </div>
      </div>
    </div >
  );
};

export default ProductDetail;