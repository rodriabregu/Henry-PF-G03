import { useState } from "react";
import { useDispatch } from "react-redux";
import postProduct from '../../Redux/Actions/Products/postProducts.ts';
import { useForm } from 'react-hook-form';

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
    "name":'',
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
  
/*   const handleCategories = e => { setInput({
    ...input, 
    categories:input.categories.concat(e.target.value) } )
  }; */

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
    dispatch(postProduct(product))
    console.log('el input', product)
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label for="name">
          Product name
        </label>
        <input
          type="text"
          name="name"
          placeholder="name product here"
          required="required"
          value={input.name}
          onChange={handleInput}
        />
        {errors.name && <p className="danger">{errors.name}</p>}

        <label for="photos">
        photos url
        </label>
        <input
          type="text"
          name="photos"
          placeholder="Enter url photos here"
          required="required"
          value={input.photos}
          onChange={handlePhotos}
        />
        {errors.photos && <p className="danger">{errors.photos}</p>}
        
        <label for="descriptions">
        descriptions
        </label>
        <input
          type="text"
          name="description"
          placeholder="Enter the description"
          required="required"
          value={input.description}
          onChange={handleInput}
        />
        {errors.description && <p className="danger">{errors.description}</p>}
        
        <label for="price">
        Price
        </label>
        <input
          type="number"
          name="price"
          placeholder="Enter the price"
          required="required"
          value={input.price}
          onChange={handleInput}
        />
        {errors.price && <p className="danger">{errors.price}</p>}
        
        <label for="stock">
        Stock
        </label>
        <input
          type="number"
          name="stock"
          placeholder="Enter the stock"
          required="required"
          value={input.stock}
          onChange={handleInput}
        />
        {errors.stock && <p className="danger">{errors.stock}</p>}

        <label for="brand">
        Brand
        </label>
        <input
          type="text"
          name="brand"
          placeholder="Enter the brand"
          required="required"
          value={input.brand}
          onChange={handleInput}
        />
        {errors.brand && <p className="danger">{errors.brand}</p>}
        category
        <label for="categories">
        Category
        </label>
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
        {errors.categories && <p className="danger">{errors.categories}</p>}
        <button>Submit</button>
      </form>
    </div>
  )
};
/* const { register, handleSubmit, formState: { errors } } = useForm(); */

/* const onSubmit = data => console.log(data); */

/* function onSubmit2(data){
  dispatch(postProduct(data))
  console.log('data aca', data);
} */

/* return (
  <form onSubmit={handleSubmit(onSubmit2)}>
    <input type="text" placeholder="Name product" {...register("name", {required: true, max: 16, min: 3, maxLength: 80})} />
    <input type="text" placeholder="Photo URL" {...register("photo", {required: true})} />
    <input type="text" placeholder="Description" {...register("description", {required: true, max: 4, min: 80})} />
    <input type="number" placeholder="Price" {...register("price", {required: true, max: 1000, min: 1, maxLength: 12})} />
    <input type="number" placeholder="Stock" {...register("stock", {required: true, max: 999, min: 1})} />
    <input type="text" placeholder="Brand" {...register("brand", {required: true, max: 16, min: 2})} />
    <input type="text" placeholder="Category" {...register("categories", {max: 16, min: 3})} />

    <input type="submit" />
  </form>
);
} */

export default CreateProducts;