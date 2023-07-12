import React, { useEffect } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useRecoilState } from 'recoil';
import searchTextAtom from '../../recoil/searchTextAtom';
const SearchBar = () => {
  const [inputVal, setInputVal] = useRecoilState(searchTextAtom);
  useEffect(() => {
    console.log(inputVal);
  }, [inputVal]);

  return (
    <div className='Search-icon-wrapper'>
      <input type="text" id= "searchBar"placeholder="Search here ..." className='Search-Input'  value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      <div className='searchIcon'>
        <SearchRoundedIcon fontSize='large' />
      </div>
    </div>
  )
}

export default SearchBar