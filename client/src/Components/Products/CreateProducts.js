import { useState } from "react";
import { useDispatch } from "react-redux";
import postProduct from '../../Redux/Actions/Products/postProduct';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "You must type a name";
  } else {
    errors.name = "";
  }

  if (!input.weight) {
    errors.weight = "You must type a weight range";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.weight)) {
    errors.weight = "Weight must be a range. Example: '10-15'";
  } else {
    errors.weight = "";
  }

  if (!input.height) {
    errors.height = "You must type a height range";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.height)) {
    errors.height = "Height must be a range. Example: '10-15'";
  } else {
    errors.height = "";
  }
  
  if (!input.years) {
    errors.years = "You must type a Years";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.years)) {
    errors.years = "Years must be a range. Example: '10-15'";
  } else {
    errors.years = "";
  }
  return errors;
}

const CreateProducts = () => {

  const dispatch = useDispatch()

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    product:'',
    price:'',
    category:'',
    brand:'',
    description:'',
    stock:0,
    photo:''
  });
  

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  async function handleSubmit(e){
    e.preventDefault();
    dispatch(postProduct(input))
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label  for="product">
          Product
        </label>
        <input
          type="text"
          name="product"
          placeholder="product here"
          required="required"
          value={input.product}
          onChange={handleInput}
        />
        {errors.product && <p className="danger">{errors.product}</p>}
      </form>
    </div>
  )
};

export default CreateProducts;