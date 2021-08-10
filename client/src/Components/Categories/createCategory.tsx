import {useState} from 'react'
import axios from 'axios'
import './createCategory.css';

const CreateCategory = () => {
    
  const [category,setCategory]=useState('')
  const [message,setMessage]=useState('');

  const handleChange=(e:any)=>{
    setCategory(e.target.value)
  }

  
  const handleSubmit=(e:any)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/categories/new',{name:category})
      .then(resp=>{
        //console.log(resp.data)
        setMessage(resp.data)
      })
      .catch(err=>{
        //console.log(err.response.data)
        setMessage(err.response.data)
      })

      setTimeout(()=>{
        setMessage('')
      },10000)
  }


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
            <div><h4>{message}</h4></div>
      </form>
    </div>
    );
  };


  export default CreateCategory;