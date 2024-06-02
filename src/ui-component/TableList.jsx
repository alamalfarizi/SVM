import React, { useState } from 'react';
import { MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import PaginationSection from './PaginationSection';
import { IconInfoCircle, IconTrash } from '@tabler/icons-react';

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
            {tableActions && <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData, index) => (
            <TableRow key={index}>
              <TableCell>{rowsPerPage * (page - 1) + (index + 1)}</TableCell>
              {children
                ? children(rowData)
                : tableBodies.map((body, bodyIndex) => (
                    <TableCell sx={{ textAlign: 'center' }} key={bodyIndex}>
                      {imageFields && imageFields.includes(body) ? (
                        <img src={rowData[body]} alt={body} style={{ width: '100px', height: 'auto' }} />
                      ) : (
                        rowData[body]
                      )}
                    </TableCell>
                  ))}
              {tableActions && (
                <TableCell sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  {tableActions.map((action, index) => (
                    <MenuItem
                      key={index}
                      aria-label={action.title}
                      sx={{
                        borderRadius: '99px',
                        color: action.title === 'Hapus' ? 'error.main' : 'success.main',
                        backgroundColor: action.title === 'Hapus' ? 'error.light' : 'success.light',
                        '&:hover': {
                          backgroundColor: action.title === 'Hapus' ? 'error.main' : 'success.main',
                          color: 'white'
                        }
                      }}
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
                      {action.title === 'Hapus' ? <IconTrash /> : <IconInfoCircle />}
                    </MenuItem>
                  ))}
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
