// material-ui
import { Alert, Button, Chip, Grid, TableCell, Box, Typography } from '@mui/material';

// project imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import CenteredCircularProgress from '../../ui-component/CircularProgress';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import DeleteDialog from '../../ui-component/DeleteDialog';
import SearchComponent from '../../ui-component/Search';
import TableList from '../../ui-component/TableList';
import MainCard from '../../ui-component/cards/MainCard';
import CustomDialog from '../../ui-component/CustomDialog';
import { deletePengaduan, getPengaduanAll } from '../../store/actions/PengaduanAction';
import { getQuestionAll } from '../../store/actions/QuestionAction';

// ==============================|| DATA PAGE ||============================================ //
const DataCheck = () => {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState();
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [isFilterDialog, setFilterDialog] = useState(false);
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    jenis_kamar: '',
    gedung: '',
    lantai: '',
    status_aktif: ''
  });
  const tableHeaders = ['Kode', 'Pertanyaan', 'Jawaban'];
  const tableActions = [
    {
      title: 'Detail',
      link: (data) => `/data/data-detail/${data.question_id}`
    },
    {
      title: 'Hapus',
      onClickValue: (data) => {
        setSelectValue(data);
        setDeleteDialog(true);
      }
    }
  ];

  const { loading, error } = useSelector((state) => state.question);
  const rows = useSelector((state) => state.question.all);

  useEffect(() => {
    console.log(rows);
    dispatch(getQuestionAll());
  }, [dispatch]);

  const handleCancel = () => {
    setDeleteDialog(false);
    setConfirmDialog(false);
  };

  const handleDelete = (selectValue) => {
    dispatch(deletePengaduan(selectValue.id_report))
      .unwrap()
      .then((val) => {
        if (val.success) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getPengaduanAll());
          setDeleteDialog(false);
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
    <MainCard
      title="Data Pertanyaan"
      secondary={
        <Button
          variant="contained"
          size="small"
          color="error"
          component={Link}
          to={{ pathname: '/data/data-add' }}
          sx={{ borderRadius: '8px' }}
        >
          Tambah Data
        </Button>
      }
    >
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
        <Button
          type="submit"
          variant="contained"
          onClick={() => setFilterDialog(true)}
          color={'error'}
          sx={{ width: '100px', mb: 2, borderRadius: '10px' }}
        >
          Filter
        </Button>
      </Box>
      {loading ? (
        <Box>
          <CenteredCircularProgress />
        </Box>
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
          //   handleChangeRowsPerPage={handleChangeRowsPerPage}
          //   totalPages={Math.ceil(count / rowsPerPage) || 0}
          page={page}
          //   handleChangePage={handleChangePage}
        >
          {(rowData) => (
            <>
              <TableCell>{rowData?.question_id}</TableCell>
              <TableCell>{rowData?.question_text}</TableCell>
              <TableCell>
                {rowData.answers?.map((answer, index) => (
                  <Box key={answer?.answer_id} sx={{ display: 'flex', gap: 1 }}>
                    <Typography>{index + 1}</Typography>
                    <Typography textAlign={'justify'}>{answer.answer_text}</Typography>
                  </Box>
                ))}
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

export default DataCheck;
