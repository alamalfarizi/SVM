// material-ui
import { Box, Button, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// project import
import MainCard from '../../ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { productTypeGetAll, productTypeGetId, updateProductType } from '../../store/actions/ProductTypeAction';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import { toastNotif, ToastStatus } from '../../utils/Toast';

const KategoriDetail = () => {
  const { id } = useParams();
  const cleanedId = id.replace(/[{}]/g, '');
  const dispatch = useDispatch();
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState(cleanedId);
  const [values, setValues] = useState({
    type_id: '',
    type_name: '',
    description: ''
  });

  const productTypeState = useSelector((state) => state.productType.detail);

  useEffect(() => {
    if (id) {
      const cleanedId = id.replace(/[{}]/g, '');
      dispatch(productTypeGetId(cleanedId));
    }

    setValues({
      type_id: productTypeState.type_id,
      type_name: productTypeState.type_name,
      description: productTypeState.description
    });
    console.log(values);
  }, [dispatch, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleConfirmUpdate = () => {
    const data = {
      product_type: {
        type_name: values.type_name,
        description: values.description
      }
    };
    dispatch(updateProductType({ id: cleanedId, data }))
      .unwrap()
      .then((val) => {
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(productTypeGetAll());
          setConfirmDialog(false);
        }
      })
      .catch((error) => {
        toastNotif(ToastStatus.ERROR, error);
      });
  };

  const handleUpdate = () => {
    setConfirmDialog(true);
  };

  const handleCancel = () => {
    setConfirmDialog(false);
  };

  return (
    <MainCard title="Kategori Detail" isGoBack={true}>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField type="text" name="type_id" fullWidth label="Id Kategori" disabled value={values.type_id} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField type="text" name="type_name" fullWidth label="Nama Kategori" value={values.type_name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField type="text" name="description" fullWidth label="Deskripsi" value={values.description} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6} lg={6} />
          <Grid item xs={12} md={6} lg={6}>
            <Button variant="contained" fullWidth color="success" sx={{ borderRadius: '8px' }} onClick={handleUpdate}>
              Ubah
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          valueSelect={selectValue}
          onCancel={handleCancel}
          onConfirm={handleConfirmUpdate}
          confirmTitle="Ubah Kategori"
        />
      )}
    </MainCard>
  );
};

export default KategoriDetail;
