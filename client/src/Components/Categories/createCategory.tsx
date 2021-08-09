import {useState} from 'react'
import axios from 'axios'
const CreateCategory = () => {
    
  const [category,setCategory]=useState('')

  const handleChange=(e:any)=>{
    setCategory(e.target.value)
  }
  
  const handleSubmit=()=>{
    axios.post('http://localhost:3001/categories/new',{name:category})
      .then(resp=>{
        console.log(resp.data)
      })
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
      </form>
    );
  };


  export default CreateCategory;