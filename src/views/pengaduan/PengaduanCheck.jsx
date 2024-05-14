// material-ui
import { Alert, Button, Chip, Grid, TableCell, Box } from '@mui/material';

// project imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CenteredCircularProgress from '../../ui-component/CircularProgress';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import DeleteDialog from '../../ui-component/DeleteDialog';
import SearchComponent from '../../ui-component/Search';
import TableList from '../../ui-component/TableList';
import MainCard from '../../ui-component/cards/MainCard';
import CustomDialog from '../../ui-component/CustomDialog';
import { deletePengaduan, getPengaduanAll } from '../../store/actions/PengaduanAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

const PengaduanCheck = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectValue, setSelectValue] = useState();
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [isFilterDialog, setFilterDialog] = useState(false);
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const { loading, error } = useSelector((state) => state.pengaduan);
  
  const rowsState = useSelector((state) => state.pengaduan.all);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.ceil(rowsState.length / rowsPerPage);
  const rows = rowsState.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  
  const [count, setCount] = useState(rows.length);
  
  const tableHeaders = ['Kode Pengaduan', 'Reporter Name', 'Identification Number', 'Contact Info', 'Reporter Status', 'Report Status'];
  const tableActions = [
    {
      title: 'Detail',
      link: (data) => `/pengaduan/pengaduan-detail/${data.id_report}`
    },
    {
      title: 'Aktif/Non-Aktif',
      onClickValue: (data) => {
        setSelectValue(data);
        setConfirmDialog(true);
      }
    },
    {
      title: 'Hapus',
      onClickValue: (data) => {
        setSelectValue(data);
        setDeleteDialog(true);
      }
    }
  ];

  useEffect(() => {
    console.log(count);
    dispatch(getPengaduanAll());
  }, [dispatch]);

  const handleCancel = () => {
    setDeleteDialog(false);
    setConfirmDialog(false);
  };

  const handleDelete = (selectValue) => {
    dispatch(deletePengaduan(selectValue.id_report))
      .unwrap()
      .then((val) => {
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          setDeleteDialog(false);
          dispatch(getPengaduanAll());
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  //   const dialogContent = (value) => (
  //     <Box my={1}>
  //       <Grid container spacing={2}>
  //         <Grid item xs={6}>
  //           <CustomSelect
  //             label="Jenis Kamar"
  //             value={filters.jenis_kamar}
  //             onChange={handleChange('jenis_kamar')}
  //             options={jenisKamarOptions}
  //             size="small"
  //             minWidth={'100%'}
  //             margin={'normal'}
  //           />
  //           <CustomSelect
  //             label="Gedung"
  //             value={filters.gedung}
  //             onChange={handleChange('gedung')}
  //             options={gedungOptions}
  //             size="small"
  //             minWidth={'100%'}
  //             margin={'normal'}
  //           />
  //         </Grid>
  //         <Grid item xs={6}>
  //           <CustomSelect
  //             label="Lantai"
  //             value={filters.lantai}
  //             onChange={handleChange('lantai')}
  //             options={lantaiOptions}
  //             size="small"
  //             minWidth={'100%'}
  //             margin={'normal'}
  //           />
  //           <CustomSelect
  //             label="Status Aktif Kamar"
  //             value={filters.status_aktif}
  //             onChange={handleChange('status_aktif')}
  //             options={statusKamarOptions}
  //             size="small"
  //             minWidth={'100%'}
  //             margin={'normal'}
  //           />
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   );

  return (
    <MainCard title="Data Pengaduan">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: (theme) => [`repeat(2, 1fr)`, `repeat(4, 1fr)`]
        }}
        mb={2}
      >
        <SearchComponent
          //   onSearch={handleSearch}
          searchQuery={search}
          //   onInputChange={handleChangeSearch} // Pass the input change handler
        />
      </Box>
      {loading ? (
        <CenteredCircularProgress />
      ) : error ? (
        <Alert severity="error">Error: {error}</Alert>
      ) : rows && rows.length === 0 ? (
        <Box height={'50vh'}>
          <Alert severity="info">Data Kosong</Alert>
        </Box>
      ) : rows == null ? (
        <Box height={'50vh'}>
          <Alert severity="info">Data Tidak Ditemukan</Alert>
        </Box>
      ) : (
        <TableList
          data={rows}
          tableHeaders={tableHeaders}
          tableActions={tableActions}
          rowsPerPage={rowsPerPage}
          // handleChangeRowsPerPage={setRowsPerPage}
          totalPages={pageCount}
          page={page}
          // handleChangePage={setPage}
        >
          {(rowData) => (
            <>
              <TableCell>{rowData.id_report}</TableCell>
              <TableCell>{rowData.reporter_name}</TableCell>
              <TableCell>{rowData.identification_number}</TableCell>
              <TableCell>{rowData.contact_info ?? '-'}</TableCell>
              <TableCell>{rowData.reporter_status ?? '-'}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={rowData.report_status}
                  color={rowData.report_status === 'waiting' ? 'error' : 'success'}
                  sx={{
                    padding: '6px',
                    width: ' 100px'
                  }}
                />
              </TableCell>
            </>
          )}
        </TableList>
      )}
      {isDeleteDialog && (
        <DeleteDialog
          isOpen={isDeleteDialog}
          value={selectValue}
          valueSelect={selectValue.id_report}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}

      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          value={selectValue}
          onCancel={handleCancel}
          // onConfirm={handleConfirm}
          valueSelect={selectValue.id_report}
          confirmTitle={selectValue.report_status === 'waiting' ? 'Non Aktif' : 'Aktif'}
        />
      )}

      {/*
      {isFilterDialog && (
        <CustomDialog
          open={isFilterDialog}
          handleClose={() => setFilterDialog(false)}
          content={dialogContent()}
          title="Filter Kamar"
          actions={[
            { label: 'Reset', onClick: handleResetFilter, color: 'primary' },
            { label: 'Filter', onClick: handleFilter, color: 'secondary', variant: 'contained' }
          ]}
        />
      )} */}
    </MainCard>
  );
};

export default PengaduanCheck;
