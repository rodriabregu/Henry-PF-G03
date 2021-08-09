import {useState} from 'react'
import axios from 'axios'
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
      },5000)
  }


  return (
      <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre de la categoria</label>
            <input required onChange={handleChange} type="text" name="category" value={category} />
          </div>
          <div>
            <input type="submit" value="Submit"/>
          </div>

          <div><h4>{message}</h4></div>
      </form>
    );
  };


  export default CreateCategory;