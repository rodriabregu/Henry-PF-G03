import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";
import { addReview } from '../../Redux/Actions/Products/addReview';
import { state, review, product, productNull, reviewNull } from '../../typesApp'
import toast, { Toaster } from 'react-hot-toast';
import '../ProductDetail/productDetail.css';

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

export const Reviews = (props: { productId: number }) => {
  const dispatch = useDispatch();
  const { productId } = props
  const user = useSelector((state: state) => state.user);
  const [show, setShow] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(1);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)
  const product: product = useSelector(
    (state: state) => state.products.find(
      (product: product) => product.id === productId
    )
  ) || productNull
  const [review, setReview] = useState(reviewNull);

  function handleReview(e: any) {
    setReview({
      id: 0,
      text: e.target.value,
      stars: currentValue,
      ProductId: product.id
    });
  };

  const notify = () => toast.success('Successfully review created!');

  const handleMouseOver = (newHoverValue: any) => {
    setHoverValue(newHoverValue)
  };

  const handleShow = () => {
    if (user.bought.some(
      item => item.productId === product.id)
    ) setShow(!show)
  }

  const handleSubmit = () => {
    dispatch(addReview(review, ""))
    setReview(reviewNull);
    notify()
  }

  return (
    <div><h3>Reviews</h3>
      {product.reviews.map((review: review) => {
        return (<div><span>
          {review.text}-{review.stars}
        </span></div>)
      })}
      <div className='form-review'>
        <button
          className='btn-review'
          onClick={handleShow}
        >Write review</button>
        {show &&
          <div>
            <h3> Write a review and rating </h3>
            <div>
              <div>
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={24}
                      onClick={() => setCurrentValue(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={() => setHoverValue(undefined)}
                      color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                      style={{ marginRight: 10, cursor: "pointer" }} />
                  )
                })}
              </div>
              <div className='add-review'>
                <textarea className='text-add'
                  name="review"
                  placeholder="Enter the description review..."
                  onChange={handleReview}
                />
                <button
                  className='btn-addreview'
                  onClick={handleSubmit}
                >Submit</button>
              </div>
              <Toaster />
            </div>
          </div>
        }
      </div>
    </div >
  );
};