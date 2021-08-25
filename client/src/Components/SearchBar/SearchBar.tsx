import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { TiDelete } from 'react-icons/ti';
import './SearchBar.css';

interface ISearchBar {
  onSearch: (input: string) => void;
  filterp: any
};

const SearchBar = ({ onSearch, filterp }: ISearchBar): JSX.Element => {
  const [input, setInput] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);

  const searchInput = useRef<any>(null);

  const handleChange = (event: ChangeEvent): void => {
    const { value } = event.target as HTMLInputElement;
    setInput(value);
  }

  const handleSelect = (name: string): void => {
    setInput(name);
  }

  const handleClear = (): void => {
    setInput("");
    searchInput.current.focus();
  }

  useEffect(() => {
    onSearch(input.toLowerCase());
    if (searchInput.current) {
      searchInput.current.addEventListener("focus", () => {
        setShowList(true);
      });

      searchInput.current.addEventListener("focusout", () => {
        setShowList(false);
      })
    }
  }, [input, searchInput.current]);

  return (
    <div>
      <div className='container-search'>
        <input
          type="text"
          ref={searchInput}
          autoComplete="off"
          value={input}
          onChange={handleChange}
          placeholder='Find product'
        />
        <div className="clear-input" style={{ display: input.length > 0 ? "inherit" : "none" }}>
          <TiDelete size={25} onClick={handleClear} />
        </div>
        <div className="result-list" style={{ display: (showList && input.length > 0) ? 'block' : 'none' }}>
          {filterp.length > 0 ? filterp.map((elem: any) => {
            return <div onMouseDown={() => handleSelect(elem.name)} className="result-list-item">{elem.name}</div>
          }) : <div className="result-list-item">No results :(</div>}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;