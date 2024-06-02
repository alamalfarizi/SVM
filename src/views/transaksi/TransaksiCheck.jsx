// mui material
import { Alert, Box, Button, TableCell } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// import projects
import MainCard from '../../ui-component/cards/MainCard';
import { toastNotif, ToastStatus } from '../../utils/Toast';
import CenteredCircularProgress from '../../ui-component/CircularProgress';
import TableList from '../../ui-component/TableList';
import DeleteDialog from '../../ui-component/DeleteDialog';
import { getTransactionAll } from '../../store/actions/TransactionAction';
import { Link } from 'react-router-dom';

// ===============================|| TRANSAKSI CHECK ||=============================== //
const TransaksiCheck = () => {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState();
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const { loading, error } = useSelector((state) => state.transaction);

  const rowState = useSelector((state) => state.transaction.all);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.ceil(rowState.length / rowsPerPage);
  const rows = rowState.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const tableHeaders = ['Id Transaksi', 'Jumlah Transaksi', 'Total Transaksi'];
  const tableActions = [
    {
      title: 'Detail',
      link: (data) => `/transaksi/transaksi-detail/{${encodeURI(data.product_id)}}`
    },
    {
      title: 'Hapus',
      onClickValue: (data) => {
        setSelectValue(data);
        setIsDeleteDialog(true);
      }
    }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleCancel = () => {
    setIsDeleteDialog(false);
  };

  const handleDelete = () => {
    console.log(selectValue);
  };

  useEffect(() => {
    console.log(rowState);
    dispatch(getTransactionAll());
  }, [dispatch]);

  return (
    <MainCard
      title="Data Transaksi"
      secondary={
        <Button variant="contained" size="small" color="success" component={Link} to={{ pathname: '/transaksi/transaksi-add' }}>
          Tambah Data
        </Button>
      }
    >
      {loading ? (
        <CenteredCircularProgress />
      ) : error ? (
        <Alert severity="error">Error : {error}</Alert>
      ) : rows && rows.length === 0 ? (
        <Box>
          <Alert severity="error">Data Kosong</Alert>
        </Box>
      ) : rows == null ? (
        <Box>
          <Alert severity="error">Data Kosong</Alert>
        </Box>
      ) : (
        <TableList
          data={rows}
          page={page}
          tableHeaders={tableHeaders}
          tableActions={tableActions}
          rowsPerPage={rowsPerPage}
          totalPages={pageCount}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        >
          {(rowData) => (
            <>
              <TableCell>{rowData.id}</TableCell>
              <TableCell>{rowData.units_sold}</TableCell>
              <TableCell>{rowData.total_revenue}</TableCell>
            </>
          )}
        </TableList>
      )}

      {isDeleteDialog && (
        <DeleteDialog
          isOpen={isDeleteDialog}
          value={selectValue}
          valueSelect={selectValue.product_id}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </MainCard>
  );
};

export default TransaksiCheck;
