// mui material
import { Alert, Box, Button, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// project import
import MainCard from '../../ui-component/cards/MainCard';
import { deleteProduct, getProductAll } from '../../store/actions/ProductAction';
import CenteredCircularProgress from '../../ui-component/CircularProgress';
import TableList from '../../ui-component/TableList';
import DeleteDialog from '../../ui-component/DeleteDialog';
import { toastNotif, ToastStatus } from '../../utils/Toast';

// ==============================|| PRODUCT CHECK ||============================== //

const ProductCheck = () => {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState();
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const { loading, error } = useSelector((state) => state.product);

  const rowState = useSelector((state) => state.product.all);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.ceil(rowState.length / rowsPerPage);
  const rows = rowState.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const tableHeaders = ['Nama Produk', 'Harga', 'Kategori'];
  const tableActions = [
    {
      title: 'Detail',
      link: (data) => `/product/product-detail/{${encodeURI(data.product_id)}}`
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
    dispatch(deleteProduct(selectValue.product_id))
      .unwrap()
      .then((val) => {
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getProductAll());
          setIsDeleteDialog(false);
        }
      })
      .catch((error) => {
        toastNotif(ToastStatus.ERROR, error);
      });
  };

  useEffect(() => {
    dispatch(getProductAll());
  }, [dispatch]);

  return (
    <MainCard
      title="Data Product"
      secondary={
        <Button variant="contained" size="small" color="success" component={Link} to={{ pathname: '/product/product-add' }}>
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
              <TableCell>{rowData.product_name}</TableCell>
              <TableCell>{rowData.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
              <TableCell>{rowData.product_type?.type_name}</TableCell>
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

export default ProductCheck;
