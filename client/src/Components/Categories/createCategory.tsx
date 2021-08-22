import { useState } from 'react';
import axios from 'axios';
import config from '../../../src/config';
import toast, { Toaster } from 'react-hot-toast';
import './createCategory.css';

const notify = () => toast.success('Successfully category created!');

const CreateCategory = () => {
  const [category,setCategory]=useState('')
  const [message,setMessage]=useState('');

  const handleChange=(e:any)=>{
    setCategory(e.target.value)
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    axios.post(`http://${config.REACT_APP_API_URL}:3001/api/categories/new`,{name:category})
      .then(resp=>{
        notify()
      })
      .catch(err=>{
        setMessage(err.response.data)
      })
      setTimeout(()=>{
        setMessage('')
      },10000)
  };

  return (
    <div className='form-c'>
      <form onSubmit={handleSubmit}>
          <div><h1>Add a new category</h1></div>
            <div>
              <label>Category name:</label>
              <input required onChange={handleChange} type="text" name="category" value={category} />
            </div>          
            <div>
              <input className='btn-c' type="submit" value="Submit"/>
            </div>
            <Toaster/>
            <div><h4>{message}</h4></div>
      </form>
    </div>
    );
};

export default CreateCategory;