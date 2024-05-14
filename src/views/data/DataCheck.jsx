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
import { deleteQuestion, getQuestionAll } from '../../store/actions/QuestionAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

// ==============================|| DATA PAGE ||============================================ //
const DataCheck = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectValue, setSelectValue] = useState();
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [isFilterDialog, setFilterDialog] = useState(false);
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const { loading, error } = useSelector((state) => state.question);
  const rowsState = useSelector((state) => state.question.all);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.ceil(rowsState.length / rowsPerPage);
  const rows = rowsState.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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

  useEffect(() => {
    console.log(rows);
    dispatch(getQuestionAll());
  }, [dispatch]);

  const handleCancel = () => {
    setDeleteDialog(false);
    setConfirmDialog(false);
  };

  const handleDelete = (selectValue) => {
    dispatch(deleteQuestion(selectValue.question_id))
      .unwrap()
      .then((val) => {
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getQuestionAll());
          setDeleteDialog(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

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
          page={page}
          tableActions={tableActions}
          rowsPerPage={rowsPerPage}
          totalPages={pageCount}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
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
          valueSelect={selectValue.question_id}
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
          valueSelect={selectValue.question_id}
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
