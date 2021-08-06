import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/getProducts';
import { getProductsDetail } from '../../Redux/Actions/getProductsDetail';

interface ISearchBar {
  onSearch: (input:string) => void;
}

const SearchBar = ({onSearch}:ISearchBar): JSX.Element => {
/*   const [title, setTitle] = useState(""); */
  const [input, setInput ] = useState<string>('');
/*   const [filterp, setFilterp] = useState([]); */
/*   const dispatch = useDispatch();
  const products:any = useSelector<any>(s => s.products); */

  const handleChange = (event:ChangeEvent):void=>{
    const {value} = event.target as HTMLInputElement
    setInput(value)
  }

/*   useEffect(() => {
    dispatch(getProducts())
  }, []) */

  useEffect(() => {
    onSearch(input);
  }, [input]);

  return (
    <div>
    <form>
      <input type="text"
      autoComplete="off"
      value={input}
      onChange={handleChange}    
      placeholder='Find product'  
      />
{/*       <button type='submit'>
        Search <VscSearch/>
      </button> */}
    </form>
  </div>
  )
};

export default SearchBar;