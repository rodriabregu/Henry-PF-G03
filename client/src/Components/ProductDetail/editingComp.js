import { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import editProducts from "../../Redux/Actions/Products/editProducts";
import './editComp.css';

const notify = () => toast.success('Successfully created!');

const EditingProduct = ({id, name, stock, price, description, categories, brand}) => {
  const dispatch = useDispatch()  

  const [input, setInput] = useState({
    name: name,
    photos: [],
    description: description,
    price: price,
    stock: stock,
    brand: brand.name,
    categories: []
  });

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotos = (e) => { setInput({
    ...input, 
    photos:input.photos.concat(e.target.value) } )
  };

/*   const handleChange = (e) => {
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })  
  };

  const handleCategories=(e)=>{
    console.log(e)
    setInput({
      ...input,
      categories:[...input.categories, e.target.value],
    })
  }; */

/*   const removeCategory= e => {
    setInput({
      ...input,
      categories:input.categories.filter( c => c !== e.target.id ),
    })
  }; */

  const product = {
    "product": {
      "id": id,
      "name": input.name,
      "price": parseInt(input.price),
      "stock": parseInt(input.stock),
      "description": input.description,
      "brand": input.brand
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(editProducts(product.product))
    notify()
    window.location.reload();
    console.log('aca',product)
    /* setInput({
      name:'',
      photos: [],
      description:'',
      price: 0,
      stock: 0,
      brand:'',
      categories: [],
    }) */
  };

  return (
    <div className='form-edit'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div><h2>Edit product</h2></div>
        <div><label for="name">Product name:</label>
          <input
          type="text"
          name="name"
          placeholder="Name product here"
          required="required"
          defaultValue={name}
          onChange={handleInput}/> 
        </div>
{/*         <div>
          <label for="photos">Photos:</label>
          <input
          type="text"
          name="photos"
          placeholder="Enter url photos here"
          required="required"
          defaultValue={description}
          onChange={handlePhotos}/> 
        </div> */}
        <div>
          <label for="descriptions">Description:</label>
          <input
          type="text"
          name="description"
          placeholder="Enter the description"
          required="required"
          defaultValue={description}
          onChange={handleInput}/>
          </div>
        <div>
          <label for="price">Price:</label>
          <input
          type="number"
          name="price"
          placeholder="Enter the price"
          required="required"
          defaultValue={price}
          onChange={handleInput}/>
          </div>
        <div>
        <label for="stock">Stock:</label>
          <input
            type="number"
            name="stock"
            placeholder="Enter the stock"
            required="required"
            defaultValue={stock}
            onChange={handleInput}/>
        </div>
        <div>
        <label for="brand">Brand:</label>
          <input
            type="text"
            name="brand"
            placeholder="Enter the brand"
            required="required"
            defaultValue={brand.name}
            onChange={handleInput}/>
        </div>
          <Toaster/>
        <div>
          <button className='btnEdit'>Submit</button>
        </div>
      </form>
    </div>
  )
};

export default EditingProduct;