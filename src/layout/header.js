import React, { useRef, useContext, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from '../context/context.js';
import { SEARCH_ACTION } from '../constants/index.js';

export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState(state.searchTerm);
  let navigate = useNavigate();
  return (
    <div className="header-main">
      <Link to="/">unbxd</Link>
      <nav>
        <Link to="/category/shirt">Shirt</Link> |{' '}
        <Link to="/category/pants">Pants</Link>
      </nav>
      <div>
        <Paper
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
          }}
        >
          <InputBase
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for a product"
            inputProps={{ 'aria-label': 'Search for a product' }}
          />
          <IconButton
            onClick={() => {
              dispatch({
                type: SEARCH_ACTION,
                searchTerm: searchInput,
              });
              navigate(`/search?q=${searchInput}`);
            }}
            sx={{ p: '10px' }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}
