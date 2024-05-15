// material-ui
import { Alert, Button, Chip, Grid, TableCell, Box } from '@mui/material';

// project imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CenteredCircularProgress from '../../ui-component/CircularProgress';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import DeleteDialog from '../../ui-component/DeleteDialog';
import SearchComponent from '../../ui-component/Search';
import TableList from '../../ui-component/TableList';
import MainCard from '../../ui-component/cards/MainCard';
import { deletePengaduan, getPengaduanAll } from '../../store/actions/PengaduanAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

const PengaduanCheck = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const { loading, error } = useSelector((state) => state.pengaduan);

  const rowsState = useSelector((state) => state.pengaduan.all);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.ceil(rowsState.length / rowsPerPage);
  const rows = rowsState.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const tableHeaders = ['Kode Pengaduan', 'Nama Pelapor', 'Nomor Identitas', 'Informasi Kontak', 'Status Pelapor', 'Tingkat Cluster'];
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

  const handleCancel = () => {
    setDeleteDialog(false);
    setConfirmDialog(false);
  };

  const handleDelete = (selectValue) => {
    dispatch(deletePengaduan(selectValue.id_report))
      .unwrap()
      .then((val) => {
        console.log(val);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  useEffect(() => {
    console.log(rowsState);
    dispatch(getPengaduanAll());
  }, [dispatch]);

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
          //   onInputChange={handleChangeSearch}
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
          page={page}
          totalPages={pageCount}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        >
          {(rowData) => (
            <>
              <TableCell>{rowData.id_report}</TableCell>
              <TableCell>{rowData.reporter_name}</TableCell>
              <TableCell>{rowData.identification_number}</TableCell>
              <TableCell>{rowData.contact_info ?? '-'}</TableCell>
              <TableCell>{rowData.reporter_status ?? '-'}</TableCell>
              <TableCell>{rowData?.cluster?.cluster_level}</TableCell>
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
          valueSelect={selectValue.id_report}
          confirmTitle={selectValue.report_status === 'waiting' ? 'Non Aktif' : 'Aktif'}
        />
      )}
    </MainCard>
  );
};

export default PengaduanCheck;
