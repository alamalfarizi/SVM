import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import PaginationSection from './PaginationSection';

function TableList({
  data,
  tableHeaders,
  tableBodies,
  tableActions,
  imageFields,
  children,
  rowsPerPage,
  handleChangeRowsPerPage,
  totalPages,
  page,
  handleChangePage
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '600' }}>No</TableCell>
            {tableHeaders.map((header, index) => (
              <TableCell key={index} sx={{ fontWeight: '600' }}>
                {header}
              </TableCell>
            ))}
            {tableActions && <TableCell sx={{ fontWeight: '600' }}>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData, index) => (
            <TableRow key={index}>
              <TableCell>{rowsPerPage * (page - 1) + (index + 1)}</TableCell>
              {children
                ? children(rowData)
                : tableBodies.map((body, bodyIndex) => (
                    <TableCell key={bodyIndex}>
                      {imageFields && imageFields.includes(body) ? (
                        <img src={rowData[body]} alt={body} style={{ width: '100px', height: 'auto' }} />
                      ) : (
                        rowData[body]
                      )}
                    </TableCell>
                  ))}
              {tableActions && (
                <TableCell>
                  <IconButton
                    aria-label="more"
                    id={`${index}-long-button`}
                    aria-controls={`${index}-long-menu`}
                    aria-expanded={anchorEl ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={(e) => handleClickDropdown(e)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`${index}-long-menu`}
                    MenuListProps={{
                      'aria-labelledby': `${index}-long-button`
                    }}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && anchorEl.id === `${index}-long-button`)}
                    onClose={handleCloseDropdown}
                    slotProps={{
                      paper: {
                        style: {
                          width: '20ch',
                          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                        }
                      }
                    }}
                  >
                    {tableActions.map((action, index) => (
                      <MenuItem
                        key={index}
                        aria-label={action.title}
                        component={Link}
                        to={
                          action.link
                            ? typeof action.link === 'function'
                              ? { pathname: action.link(rowData) }
                              : action.link + '/' + rowData.id
                            : null
                        }
                        onClick={action.onClickValue ? () => action.onClickValue(rowData) : null}
                      >
                        {action.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data && data.length > 0 && (
        <PaginationSection
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          totalPages={totalPages || 0}
          page={page}
          handleChangePage={handleChangePage}
        />
      )}
    </TableContainer>
  );
}

export default TableList;
