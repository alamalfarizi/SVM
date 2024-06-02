// mui material
import { Alert, Box, Button, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// project imports
import { deleteProductType, productTypeGetAll } from '../../store/actions/ProductTypeAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';
import MainCard from '../../ui-component/cards/MainCard';
import CenteredCircularProgress from '../../ui-component/CircularProgress';
import TableList from '../../ui-component/TableList';
import DeleteDialog from '../../ui-component/DeleteDialog';

const KategoriCheck = () => {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState();
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const { loading, error } = useSelector((state) => state.productType);

  const rowState = useSelector((state) => state.productType.all);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.ceil(rowState.length / rowsPerPage);
  const rows = rowState.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const tableHeaders = ['Id kategori', 'Nama Kategori', 'Deskripsi'];
  const tableActions = [
    {
      title: 'Detail',
      link: (data) => `/kategori/kategori-detail/{${encodeURI(data.type_id)}}`
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
    dispatch(deleteProductType(selectValue.type_id))
      .unwrap()
      .then((val) => {
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(productTypeGetAll());
          setIsDeleteDialog(false);
        }
      })
      .catch((error) => {
        toastNotif(ToastStatus.ERROR, error);
      });
  };

  useEffect(() => {
    console.log(rowState);
    dispatch(productTypeGetAll());
  }, [dispatch]);

  return (
    <MainCard
      title="Data Kategori"
      secondary={
        <Button variant="contained" size="small" color="success" component={Link} to={{ pathname: '/kategori/kategori-add' }}>
          Tambah Data
        </Button>
      }
    >
      {loading ? (
        <CenteredCircularProgress />
      // ) : error ? (
      //   <Alert severity="error">Error :{error}</Alert>
      ) : rows && rows.lenght === 0 ? (
        <Box>
          <Alert severity="info">Tidak Ada Data</Alert>
        </Box>
      ) : rows == null ? (
        <Box>
          <Alert severity="info">Tidak Ada Data</Alert>
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
              <TableCell>{rowData.type_id}</TableCell>
              <TableCell>{rowData.type_name}</TableCell>
              <TableCell>{rowData.description}</TableCell>
            </>
          )}
        </TableList>
      )}
      {isDeleteDialog && (
        <DeleteDialog
          isOpen={isDeleteDialog}
          value={selectValue}
          valueSelect={selectValue.type_id}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </MainCard>
  );
};

export default KategoriCheck;
