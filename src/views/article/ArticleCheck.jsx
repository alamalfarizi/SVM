// material-ui
import { Alert, Button, TableCell, Box} from '@mui/material';

// project imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import MainCard from '../../ui-component/cards/MainCard';
import TableList from '../../ui-component/TableList';
import CenteredCircularProgress from '../../ui-component/CircularProgress';
import DeleteDialog from '../../ui-component/DeleteDialog';
import SearchComponent from '../../ui-component/Search';
import { deleteArticle, getArticleAll } from '../../store/actions/ArticleAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

//===============================|| DATA PAGE ||=================================//
const ArticleCheck = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectValue, setSelectValue] = useState();
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const { loading, error } = useSelector((state) => state.article);
  const rowsState = useSelector((state) => state.article.all);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.ceil(rowsState.length / rowsPerPage);
  const rows = rowsState.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const tableHeaders = ['Kode', 'Judul', 'Deskripsi', 'Penulis'];
  const tableActions = [
    {
      title: 'Detail',
      link: (data) => `/article/article-detail/${data.article_id}`
    },
    {
      title: 'Hapus',
      onClickValue: (data) => {
        setSelectValue(data);
        setDeleteDialog(true);
      }
    }
  ];

  const handleCancel = () => {
    setDeleteDialog(false);
    setConfirmDialog(false);
  };

  const handleDelete = (selectValue) => {
    dispatch(deleteArticle(selectValue.article_id))
      .unwrap()
      .then((val) => {
        console.log(val);
        toastNotif(ToastStatus.SUCCESS, 'Data Berhasil Dihapus');
        setDeleteDialog(false);
        dispatch(getArticleAll());
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

  useEffect(() => {
    dispatch(getArticleAll());
  }, [dispatch]);

  return (
    <MainCard
      title="Data Article"
      secondary={
        <Button
          variant="contained"
          size="small"
          color="error"
          component={Link}
          to={{ pathname: '/article/article-add' }}
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
          //   onClick={() => setFilterDialog(true)}
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
        <Alert severity="error">Error : {error}</Alert>
      ) : rows && rows.length === 0 ? (
        <Box>
          <Alert severity="info">Tidak ada data</Alert>
        </Box>
      ) : rows == null ? (
        <Box>
          <Alert severity="info">Data Kosong</Alert>
        </Box>
      ) : (
        <TableList
          data={rows}
          tableHeaders={tableHeaders}
          tableActions={tableActions}
          page={page}
          totalPages={pageCount}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        >
          {(rowData) => (
            <>
              <TableCell>{rowData.article_id}</TableCell>
              <TableCell>{rowData.title}</TableCell>
              <TableCell>{rowData.description}</TableCell>
              <TableCell>{rowData.author}</TableCell>
            </>
          )}
        </TableList>
      )}
      {isDeleteDialog && (
        <DeleteDialog
          isOpen={isDeleteDialog}
          value={selectValue}
          valueSelect={selectValue.article_id}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </MainCard>
  );
};

export default ArticleCheck;
