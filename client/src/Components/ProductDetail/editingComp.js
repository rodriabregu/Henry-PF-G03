import { useState } from "react";
import { useDispatch } from "react-redux";
import SelectCategory from "../Products/SelectCategory";
import toast, { Toaster } from 'react-hot-toast';
import editProducts from "../../Redux/Actions/Products/editProducts";
import './editComp.css';

const notify = () => toast.success('Successfully editing created!');

const EditingProduct = ({id, name, stock, price, description, categories, brand}) => {
  const dispatch = useDispatch()  

  const [input, setInput] = useState({
    name: name,
    photos: [],
    description: description,
    price: price,
    stock: stock,
    brand: brand.name,
    categories: categories
  });

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const product = {
    "product": {
      "id": id,
      "name": input.name,
      "price": parseInt(input.price),
      "stock": parseInt(input.stock),
      "description": input.description,
      "brand": input.brand,
      "categories": input.categories,
    }
  };

  console.log('product',product)

  const handleCategories = (e) => {
    let opciones = document.querySelectorAll('.cboCategory option');
    let id;
    opciones.forEach(o=>{
      if ( o.innerText === e.target.value ){
        id = parseInt(o.id);
      }
    })
    let cat = {
      name: e.target.value,
      id
    }
    setInput({
      ...input,
      categories:[...input.categories, cat],
    })
  };

  const removeCategory= e => {
    setInput({
      ...input,
      categories: input.categories.filter( c => c.id != e.target.id ),
    })
  };


  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(editProducts(product.product))
    notify()
    /* window.location.reload(); */
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
        <div>
        <div className='categ-s'>
          <label for="categories">Category: </label>
          <SelectCategory name="categories" className='cboCategory' path='categories' onChange={handleCategories}/>
        </div>
        </div>
          <Toaster/>
        <div>
          <button className='btnEdit'>Submit</button>
        </div>
      </form>
            {
              input.categories.map(c => {
                return ( 
                  <>
                    <button id={c.id} onClick={removeCategory}>{c.name} X</button>
                  </>
                )
              })
            }
    </div>
  )
};

export default EditingProduct;