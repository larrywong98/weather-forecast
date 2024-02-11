import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

const SearchBar = props => {
  const [locationText, setLocationText] = useState('');

  return (
    <div className="search-bar">
      <input
        value={locationText}
        onChange={e => {
          setLocationText(e.target.value);
          props.onChange(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            props.refetchOnEnter();
          }
        }}
      />
      <button onClick={() => props.refetchOnEnter()}>
        <CiSearch size={20} color="black" />
      </button>
    </div>
  );
};
export default SearchBar;
