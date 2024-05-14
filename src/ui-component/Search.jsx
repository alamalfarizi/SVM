import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const SearchComponent = ({ onSearch, searchQuery, onInputChange }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchQuery);
    }
  };
  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Search"
      value={searchQuery}
      onChange={onInputChange} // Use the prop for input change
      onKeyPress={handleKeyPress}
      size="small"
      sx={{ marginBottom: 2, px: 1}} 
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => onSearch(searchQuery)} edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
      InputLabelProps={{
        sx: { paddingLeft: 1, paddingRight: 1 } // Set padding for the label
      }}
    />
  );
};

export default SearchComponent;
