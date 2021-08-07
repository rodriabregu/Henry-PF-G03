import { useState, useEffect, ChangeEvent } from 'react';
import './SearchBar.css';

interface ISearchBar {
  onSearch: (input:string) => void;
};

const SearchBar = ({onSearch}:ISearchBar): JSX.Element => {
  const [input, setInput ] = useState<string>('');

  const handleChange = (event:ChangeEvent):void => {
    const {value} = event.target as HTMLInputElement
    setInput(value);
  }

  useEffect(() => {
    onSearch(input.toLowerCase());
  }, [input]);

  return (
    <div>
      <div className='container-search'>
      <input 
        type="text"
        autoComplete="off"
        value={input}
        onChange={handleChange}    
        placeholder='Find product'  
      />
      </div>
  </div>
  );
};

export default SearchBar;