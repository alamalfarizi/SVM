import { Box, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
import React from 'react';

const PaginationSection = ({ rowsPerPage, handleChangeRowsPerPage, totalPages, page, handleChangePage }) => {
  return (
    <Box
      sx={{
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <InputLabel htmlFor="rows-per-page">Rows per page:</InputLabel>
      <Select
        value={rowsPerPage}
        onChange={handleChangeRowsPerPage}
        inputProps={{
          name: 'rows-per-page',
          id: 'rows-per-page'
        }}
        sx={{
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 0
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0
          }
        }}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
      <Pagination count={totalPages || 1} page={page} onChange={handleChangePage} showFirstButton showLastButton />
    </Box>
  );
};

export default PaginationSection;
