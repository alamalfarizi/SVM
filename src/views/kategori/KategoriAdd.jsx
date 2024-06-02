// material-ui
import { Box, Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

// import projects
import MainCard from '../../ui-component/cards/MainCard';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import { submitProductType } from '../../store/actions/ProductTypeAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

const KategoriAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState('Kategori');
  const [values, setValues] = useState({
    type_name: '',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleDialog = () => {
    setIsConfirmDialog(true);
  };

  const handleCancelSubmit = () => {
    setIsConfirmDialog(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleConfirmSubmit = () => {
    dispatch(submitProductType(values))
      .unwrap()
      .then((val) => {
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          setIsConfirmDialog(false);
          handleGoBack();
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  return (
    <MainCard title="Tambah Data Kategori" isGoBack={true}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="text"
              name="type_name"
              value={values.type_name}
              onChange={handleChange}
              fullWidth
              label="Nama Kategori"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              fullWidth
              label="Deskripsi"
              size="small"
              multiline
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} />
          <Grid item xs={12} md={6} lg={6}>
            <Button variant="contained" fullWidth color="success" sx={{ borderRadius: '8px' }} onClick={handleDialog}>
              Tambah Data
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          valueSelect={selectValue}
          onCancel={handleCancelSubmit}
          onConfirm={handleConfirmSubmit}
          confirmTitle="Tambah Data"
        />
      )}
    </MainCard>
  );
};

export default KategoriAdd;
