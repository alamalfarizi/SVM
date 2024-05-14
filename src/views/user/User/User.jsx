// material-ui
import { Alert, Button, Grid, TableCell, TextField } from '@mui/material';

// project imports
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteDialog from '../../../ui-component/DeleteDialog';
import SearchComponent from '../../../ui-component/Search';
import TableList from '../../../ui-component/TableList';
import MainCard from '../../../ui-component/cards/MainCard';
import { userDummy } from './Dummy';
import { useDispatch, useSelector } from 'react-redux';
import { getRole } from '../../../store/actions/MasterFormAction';
import { changeStatusUser, deleteUser, getUser, resetUser } from '../../../store/actions/UserAction';
import { ToastStatus, toastNotif } from '../../../utils/Toast';
import CustomSelect from '../../../ui-component/CustomSelect';
import CenteredCircularProgress from '../../../ui-component/CircularProgress';
import CustomDialog from '../../../ui-component/CustomDialog';
import ConfirmDialog from '../../../ui-component/ConfirmDialog';

function EmployePage() {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState();
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [isFilterDialog, setFilterDialog] = useState(false);
  const [isActiveDialog, setIsActiveDialog] = useState(false);
  const [isResetDialog, setIsResetDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const tableHeaders = ['Nomor Karyawan', 'Nama User', 'Role User', 'Tanggal Registrasi'];
  const initialValues = {
    role_user: '',
    tanggal_awal_registrasi: '',
    tanggal_akhir_registrasi: '',
  };
  const [filters, setFilters] = useState(initialValues);

  const tableActions = [
    {
      title: 'Detail',
      link: (data) => `/user/karyawan/view/${data.karyawan_from_user_obj?.nomor_karyawan ??''}`
    },
    {
      title: 'Edit',
      link: (data) => `/user/pengguna/edit/${data.id_user}`
    },
    {
      title: 'Aktifkan/Nonaktifkan',
      onClickValue: (data) => {
        setSelectValue(data);
        setIsActiveDialog(true);
      }
    },
    {
      title: 'Reset',
      onClickValue: (data) => {
        setSelectValue(data);
        setIsResetDialog(true);
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

  const { loading, error, count } = useSelector((state) => state.user);
  const masterFormState = useSelector((state) => state.masterForm);
  const rows = useSelector((state) => state.user.users);

  const roleOptions = masterFormState.roles.map((item) => ({
    value: item.id_role_user,
    label: item.nama_role_user
  }));

  useEffect(() => {
    dispatch(getUser({ meta: { offset, rowsPerPage }, search, filters }));
  }, [dispatch]);

  useEffect(() => {
    if (masterFormState.roles.length === 0) dispatch(getRole());
  }, [masterFormState.roles, dispatch]);

  const handleDelete = (selectValue) => {
    dispatch(deleteUser(selectValue.id_user))
      .unwrap()
      .then((val) => {
        if (val.success) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getUser({ meta: { offset, rowsPerPage }, search, filters }));
          handleCancel();
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.SUCCESS, val.message);
      });
  };

  const handleActive = (selectValue) => {
    console.log(selectValue)
    dispatch(changeStatusUser(selectValue.id_user))
      .unwrap()
      .then((val) => {
        if (val.success) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getUser({ meta: { offset, rowsPerPage }, search, filters }));
          handleCancel();
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.SUCCESS, val.message);
      });
  };

  const handleReset = (selectValue) => {
    dispatch(resetUser(selectValue.id_user))
      .unwrap()
      .then((val) => {
        if (val.success) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getUser({ meta: { offset, rowsPerPage }, search, filters }));
          handleCancel();
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.SUCCESS, val.message);
      });
  };

  const handleCancel = () => {
    setDeleteDialog(false);
    setIsActiveDialog(false);
    setIsResetDialog(false);
  };

  const handleResetFilter = () => {
    setFilters(initialValues);
    setFilterDialog(false);
    setOffset(0);
    dispatch(getUser({ meta: { offset: 0, rowsPerPage }, search, filters: initialValues }));
  };

  const handleFilter = () => {
    setOffset(0);
    dispatch(getUser({ meta: { offset: 0, rowsPerPage }, search, filters }));
    setFilterDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    let offset = (newPage - 1) * rowsPerPage;
    setOffset(offset);
    setPage(newPage);
    dispatch(getUser({ meta: { offset, rowsPerPage }, search, filters }));
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    setOffset(0);
    dispatch(getUser({ meta: { offset: 0, rowsPerPage: newRowsPerPage }, search, filters }));
  };

  const handleSearch = (event) => {
    setOffset(0);
    dispatch(getUser({ meta: { offset: 0, rowsPerPage }, search, filters }));
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChange = (prop) => (event) => {
    setFilters({ ...filters, [prop]: event.target.value });
  };

  const dialogContent = (value) => (
    <Box my={1}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomSelect
            id="role-user-select"
            label="Role User"
            options={roleOptions}
            value={filters.role_user}
            onChange={handleChange('role_user')}
            size="small"
            minWidth={'100%'}
            margin="normal"
          />
          <TextField
            margin="normal"
            id="tanggal_awal_registrasi"
            label="Tanggal AWal Registrasi"
            type="date"
            value={filters.tanggal_awal_registrasi}
            onChange={handleChange('tanggal_awal_registrasi')}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true
            }}
          /> <TextField
            margin="normal"
            id="tanggal_akhir_registrasi"
            label="Tanggal Akhir Registrasi"
            type="date"
            value={filters.tanggal_akhir_registrasi}
          onChange={handleChange('tanggal_akhir_registrasi')}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <MainCard title="Data Pengguna">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: (theme) => [
            `repeat(2, 1fr)`,
            `repeat(4, 1fr)` // Styles for desktop view (sm and above)
          ]
        }}
        mb={2}
      >
        <SearchComponent
          onSearch={handleSearch}
          searchQuery={search}
          onInputChange={handleChangeSearch} // Pass the input change handler
        />
        <Button type="submit" variant="contained" onClick={() => setFilterDialog(true)} color={'secondary'} sx={{ width: '100px', mb: 2 }}>
          Filter
        </Button>
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
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          totalPages={Math.ceil(count / rowsPerPage) || 0}
          page={page}
          handleChangePage={handleChangePage}
        >
          {(rowData) => (
            <>
              <TableCell>{rowData.karyawan_from_user_obj?.nomor_karyawan ?? '-'}</TableCell>
              <TableCell>{rowData.karyawan_from_user_obj?.nama_karyawan ?? '-'}</TableCell>
              <TableCell>{roleOptions.find((option) => option.value === rowData.role)?.label ?? '-'}</TableCell>
              <TableCell>{rowData.tanggal_registrasi}</TableCell>
            </>
          )}
        </TableList>
      )}
      {isDeleteDialog && (
        <DeleteDialog
          isOpen={isDeleteDialog}
          value={selectValue}
          valueSelect={selectValue.username}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
      {isFilterDialog && (
        <CustomDialog
          open={isFilterDialog}
          handleClose={() => setFilterDialog(false)}
          content={dialogContent()}
          title="Filter Pengguna"
          actions={[
            { label: 'Reset', onClick: handleResetFilter, color: 'primary' },
            { label: 'Filter', onClick: handleFilter, color: 'secondary', variant: 'contained' }
          ]}
        />
      )}
      {isActiveDialog && (
        <ConfirmDialog
          isOpen={isActiveDialog}
          value={selectValue}
          onCancel={handleCancel}
          onConfirm={handleActive}
          valueSelect={selectValue.username}
          confirmTitle={selectValue.is_active === '1' ? 'Non Aktifkan User' : 'Aktifkan User'}
        />
      )}
      {isResetDialog && (
        <ConfirmDialog
          isOpen={isResetDialog}
          value={selectValue}
          onCancel={handleCancel}
          onConfirm={handleReset}
          valueSelect={selectValue.username}
          confirmTitle={'Reset User'}
        />
      )}
    </MainCard>
  );
}

export default EmployePage;
