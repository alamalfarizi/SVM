// material-ui
import { Alert, Autocomplete, Button, Grid, TableCell, TextField } from '@mui/material';

// project imports
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteDialog from '../../../ui-component/DeleteDialog';
import SearchComponent from '../../../ui-component/Search';
import TableList from '../../../ui-component/TableList';
import MainCard from '../../../ui-component/cards/MainCard';
import { deleteEmploye, getEmploye } from '../../../store/actions/EmployeAction';
import { useDispatch, useSelector } from 'react-redux';
import CenteredCircularProgress from '../../../ui-component/CircularProgress';
import CustomDialog from '../../../ui-component/CustomDialog';
import CustomSelect from '../../../ui-component/CustomSelect';
import { getGender, getPosition } from '../../../store/actions/MasterFormAction';
import { ToastStatus, toastNotif } from '../../../utils/Toast';

function EmployePage() {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState();
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [isFilterDialog, setFilterDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const tableHeaders = ['Nomor Karyawan', 'Nama Karyawan', 'Jenis Kelamin Karyawan', 'Jabatan', 'Mulai Bekerja', 'Foto'];
  const initialValues = {
    tanggal_awal_bekerja: '',
    tanggal_akhir_bekerja: '',
    jenis_kelamin: '',
    jabatan: ''
  };
  const [filters, setFilters] = useState(initialValues);

  const tableActions = [
    {
      title: 'Detail',
      link: (data) => `/user/karyawan/view/${data.nomor_karyawan}`
    },
    {
      title: 'Edit',
      link: (data) => `/user/karyawan/edit/${data.nomor_karyawan}`
    },
    {
      title: 'Hapus',
      onClickValue: (data) => {
        setSelectValue(data);
        setDeleteDialog(true);
      }
    }
  ];

  const { loading, error, count } = useSelector((state) => state.karyawan);
  const masterFormState = useSelector((state) => state.masterForm);
  const rows = useSelector((state) => state.karyawan.employes);

  const genderOptions = masterFormState.genders.map((item) => ({
    value: item.id_jenis_kelamin,
    label: item.nama_jenis_kelamin
  }));

  const positionOptions = masterFormState.positions.map((item) => ({
    value: item.id_jabatan,
    label: item.nama_jabatan
  }));

  useEffect(() => {
    dispatch(getEmploye({ meta: { offset, rowsPerPage }, search, filters }));
  }, [dispatch]);

  useEffect(() => {
    if (masterFormState.genders.length === 0) dispatch(getGender());
  }, [masterFormState.genders, dispatch]);

  useEffect(() => {
    if (masterFormState.positions.length === 0) dispatch(getPosition());
  }, [masterFormState.positions, dispatch]);

  const handleDelete = (selectValue) => {
    dispatch(deleteEmploye(selectValue.nomor_karyawan))
      .unwrap()
      .then((val) => {
        if (val.success) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getEmploye({ meta: { offset, rowsPerPage }, search, filters }));
          setDeleteDialog(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  const handleCancel = () => {
    setDeleteDialog(false);
  };

  const handleResetFilter = () => {
    setFilters(initialValues);
    setFilterDialog(false);
    setOffset(0);
    dispatch(getEmploye({ meta: { offset: 0, rowsPerPage }, search, filters: initialValues }));
  };

  const handleFilter = () => {
    setOffset(0);
    dispatch(getEmploye({ meta: { offset: 0, rowsPerPage }, search, filters }));
    setFilterDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    let offset = (newPage - 1) * rowsPerPage;
    setOffset(offset);
    setPage(newPage);
    dispatch(getEmploye({ meta: { offset, rowsPerPage }, search, filters }));
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    setOffset(0);
    dispatch(getEmploye({ meta: { offset: 0, rowsPerPage: newRowsPerPage }, search, filters }));
  };

  const handleSearch = (event) => {
    setOffset(0);
    dispatch(getEmploye({ meta: { offset: 0, rowsPerPage }, search, filters }));
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
          <TextField
            margin="normal"
            id="tanggal_awal_bekerja"
            label="Tanggal Awal Bekerja"
            type="date"
            value={filters.tanggal_awal_bekerja}
            onChange={handleChange('tanggal_awal_bekerja')}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true
            }}
          />

          <TextField
            margin="normal"
            id="tanggal_akhir_bekerja"
            label="Tanggal Akhir Bekerja"
            type="date"
            fullWidth
            size="small"
            value={filters.tanggal_akhir_bekerja}
            onChange={handleChange('tanggal_akhir_bekerja')}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomSelect
            id="jenis-kelamin-select"
            label="Jenis Kelamin"
            options={genderOptions}
            value={filters.jenis_kelamin}
            onChange={handleChange('jenis_kelamin')}
            size="small"
            minWidth={'100%'}
            margin="normal"
          />
          {positionOptions.length > 0 && (
            <Autocomplete
              size="small"
              id="jabatan"
              name="jabatan"
              options={positionOptions}
              getOptionLabel={(option) => option.label}
              value={positionOptions.find((option) => option.value === filters.jabatan) || null}
              onChange={(event, newValue) => {
                setFilters({ ...filters, jabatan: newValue ? newValue.value : '' });
              }}
              renderInput={(params) => <TextField {...params} margin="normal" label="Jabatan" />}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <MainCard
      title="Data Karyawan"
      secondary={
        <Button variant="contained" size="small" color="secondary" component={Link} to={{ pathname: '/user/karyawan/add' }}>
          Tambah Karyawan
        </Button>
      }
    >
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
              <TableCell>{rowData.nomor_karyawan}</TableCell>
              <TableCell>{rowData.nama_karyawan}</TableCell>
              <TableCell>{rowData.jenis_kelamin_from_karyawan_obj?.nama_jenis_kelamin ?? "-"}</TableCell>
              <TableCell>{rowData.jabatan_from_karyawan_obj.nama_jabatan ?? ''}</TableCell>
              <TableCell>{rowData.tanggal_mulai_bekerja}</TableCell>
              <TableCell>
                <img src={rowData.link_foto} alt="Employee" crossOrigin="anonymous" style={{ width: '100px', height: 'auto' }} />
              </TableCell>
            </>
          )}
        </TableList>
      )}
      {isDeleteDialog && (
        <DeleteDialog
          isOpen={isDeleteDialog}
          value={selectValue}
          valueSelect={selectValue.nomor_karyawan}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
      {isFilterDialog && (
        <CustomDialog
          open={isFilterDialog}
          handleClose={() => setFilterDialog(false)}
          content={dialogContent()}
          title="Filter Karyawan"
          actions={[
            { label: 'Reset', onClick: handleResetFilter, color: 'primary' },
            { label: 'Filter', onClick: handleFilter, color: 'secondary', variant: 'contained' }
          ]}
        />
      )}
    </MainCard>
  );
}

export default EmployePage;
