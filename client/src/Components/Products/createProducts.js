import { useState } from "react";
import { useDispatch } from "react-redux";
import { VscError} from 'react-icons/vsc';
import toast from 'react-hot-toast';
import postProducts from "../../Redux/Actions/Products/postProducts";
import './CreateProducts.css';
import SelectCategory from "./SelectCategory";

const notify = () => toast.success('Successfully created!');

const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = <VscError/>;
  } else {
    errors.name = "";
  }

  if (!input.photos) {
    errors.photos = <VscError/>;
  } else if (!input) {
    errors.photos = <VscError/>;
  } else {
    errors.photos = "";
  }

  if (!input.description) {
    errors.description = <VscError/>;
  } else if (input.description.length < 8) {
    errors.description = <VscError/>;
  } else {
    errors.description = "";
  }
  
  if (!input.price) {
    errors.price = <VscError/>;
  } else if (input.price.value <= 0) {
    errors.price = <VscError/>;
  } else {
    errors.price = "";
  }

  if (!input.stock) {
    errors.stock = <VscError/>;
  } else if (input.stock.value <= 0) {
    errors.stock = <VscError/>;
  } else {
    errors.stock = "";
  }

  if (!input.brand) {
    errors.brand = <VscError/>;
  } else if (input.brand.length < 2) {
    errors.brand = <VscError/>;
  } else {
    errors.brand = "";
  }

  return errors;
};


const CreateProducts = () => {
  const dispatch = useDispatch()  

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name:'',
    photos: [],
    description:'',
    price: 0,
    stock: 0,
    brand:'',
    categories: [1, 2, 3, 4],
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
  };

  const handlePhotos = e => { setInput({
    ...input, 
    photos:input.photos.concat(e.target.value) } )
  };

  const handleChange=(e)=>{
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }

  const product = {"product": {
    "price": input.price,
    "name": input.name,
    "stock": input.stock,
    "description": input.description,
    "brand": input.brand
  },
  "photos": input.photos,
  "categories": input.categories,
  "brand": input.brand
};

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(postProducts(product))
    notify()
    setInput({'':''})
  }

  return (
    <div className='form-create'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div><h1>Add a new product</h1></div>
        <div><label for="name">Product name:</label>
          <input
          type="text"
          name="name"
          placeholder="Name product here"
          required="required"
          value={input.name}
          onChange={handleInput}/> 
          {errors.name && <p className="danger">{errors.name}</p>}
        </div>
        <div>
          <label for="photos">Photos:</label>
          <input
          type="text"
          name="photos"
          placeholder="Enter url photos here"
          required="required"
          value={input.photos}
          onChange={handlePhotos}/> 
          {errors.photos && <p className="danger">{errors.photos}</p>}
        </div>
        <div>
          <label for="descriptions">Description:</label>
          <input
          type="text"
          name="description"
          placeholder="Enter the description"
          required="required"
          value={input.description}
          onChange={handleInput}/>
          {errors.description && <p className="danger">{errors.description}</p>}
        </div>
        <div>
          <label for="price">Price:</label>
          <input
          type="number"
          name="price"
          placeholder="Enter the price"
          required="required"
          value={input.price}
          onChange={handleInput}/>
          {errors.price && <p className="danger">{errors.price}</p>}
        </div>
        <div>
          <label for="stock">Stock:</label>
          <input
          type="number"
          name="stock"
          placeholder="Enter the stock"
          required="required"
          value={input.stock}
          onChange={handleInput}/>
          {errors.stock && <p className="danger">{errors.stock}</p>}
        </div>
        <div>
          <label for="brand">Brand</label>
          <SelectCategory required="required" name="brand" path='brand' onChange={handleChange}/>
          {/* <input
          <label for="brand">Brand:</label>
          <input
          type="text"
          name="brand"
          placeholder="Enter the brand"
          required="required"
          value={input.brand}
          onChange={handleInput}/> */}
          {errors.brand && <p className="danger">{errors.brand}</p>}
        </div>
        {/* <div> */}
          {/* <label for="categories">Category</label> */}
{/*         <select name="categories" value={input.categories} onChange={handleCategories}>
            <option value="---">Categorie:</option>
            <option value={accesories.Accesories}>1</option>
            <option value={input.Men}>2</option>
            <option value={input.Women}>3</option>
            <option value={input.Kids}>4</option>
        </select> */}
{/*         <input
          type="text"
          name="categories"
          placeholder="Enter the category"
          required="required"
          value={input.categories}
          onChange={handleInput}
        /> */}
          {/* {errors.categories && <p className="danger">{errors.categories}</p>} */}
        {/* </div> */}
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
};

export default CreateProducts;