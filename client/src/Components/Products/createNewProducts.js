import { useState } from "react";
import { useDispatch } from "react-redux";
import { VscError} from 'react-icons/vsc';
import toast, { Toaster } from 'react-hot-toast';
import postProducts from "../../Redux/Actions/Products/postProducts";
import SelectCategory from "./SelectCategory";
import './CreateProducts.css';

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
    categories: []
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

  const handleChange = e => {
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })  
  };

  const handleCategories=(e)=>{
    console.log(e)
    setInput({
      ...input,
      categories:[...input.categories,e.target.value],
    })
  };

  const removeCategory= e => {
    setInput({
      ...input,
      categories:input.categories.filter( c => c !== e.target.id ),
    })
  };

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
    console.log('creando product ',product)
    dispatch(postProducts(product))
    console.log(product)
    notify()
    setInput({
      name:'',
      photos: [],
      description:'',
      price: 0,
      stock: 0,
      brand:'',
      categories: [],
    })
  };

  return (
    <div className='form-create'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div><h1>Add a new product</h1></div>
        <div><label for="name">Product name:</label>
          {errors.name && <p className="danger">{errors.name}</p>}
          <input
          type="text"
          name="name"
          placeholder="Name product here"
          required="required"
          value={input.name}
          onChange={handleInput}/> 
        </div>
        <div>
          <label for="photos">Photos:</label>
          {errors.photos && <p className="danger">{errors.photos}</p>}

          <input
          type="text"
          name="photos"
          placeholder="Enter url photos here"
          required="required"
          value={input.photos}
          onChange={handlePhotos}/> 
        </div>
        <div>
          <label for="descriptions">Description:</label>
          {errors.description && <p className="danger">{errors.description}</p>}

          <input
          type="text"
          name="description"
          placeholder="Enter the description"
          required="required"
          value={input.description}
          onChange={handleInput}/>
          </div>
        <div>
          <label for="price">Price:</label>
          {errors.price && <p className="danger">{errors.price}</p>}

          <input
          type="number"
          name="price"
          placeholder="Enter the price"
          required="required"
          value={input.price}
          onChange={handleInput}/>
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
        <div className='brand-s'>
          <label for="brand">Brand:</label>
          <SelectCategory value='Crotone' name="brand" path='brand' onChange={handleChange}/>
        </div>
        <div className='categ-s'>
          <label for="categories">Category</label>
          <SelectCategory name="categories" path='categories' onChange={handleCategories}/>
        </div>
          <div className='categ-btn'>
            {
              input.categories.map(c => {
                return ( 
                  <>
                  <button id={c} onClick={removeCategory}>{c} X</button>
                  </>
                )
              })
            }
          </div>
          <Toaster/>
        <div>
          <button className='btn-submit'>Submit</button>
        </div>
      </form>
    </div>
  )
};

export default CreateProducts;