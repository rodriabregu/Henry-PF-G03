import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsDetail } from '../../Redux/Actions/getProductsDetail';
import { VscSearch } from 'react-icons/vsc';

const SearchBar = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e:any) => {
    setTitle(e.target.value)
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
        //dispatch(getProductsDetail(dispatch, title));
        //Debe despachar otra accion
  };

  return (
    <div>
    <form onSubmit={ e => handleSubmit(e)}>
      <input type="text"
      autoComplete="off"
      value={title}
      onChange={e => handleChange(e)}    
      placeholder='Find product'  
      />
      <button type='submit'>
        Search <VscSearch/>
      </button>
    </form>
  </div>
  )
};

export default SearchBar;