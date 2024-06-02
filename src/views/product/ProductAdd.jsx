// mui material
import { Box, Button, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { productTypeGetAll } from '../../store/actions/ProductTypeAction';
import CustomSelect from '../../ui-component/CustomSelect';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import { submitProduct } from '../../store/actions/ProductAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

// ==============================|| PRODUCT ADD ||============================== //
const ProductAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState('Produk');
  const [values, setValues] = useState({
    product_name: '',
    type_id: '',
    price: ''
  });

  const productTypeState = useSelector((state) => state.productType.all);

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
    const newValues = { ...values };
    if (newValues.undefined !== undefined) {
      newValues.type_id = newValues.undefined;
      delete newValues.undefined;
    }
    dispatch(submitProduct(newValues))
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

  useEffect(() => {
    dispatch(productTypeGetAll());
  }, [dispatch]);

  return (
    <MainCard title="Tambah Data Produk" isGoBack={true}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="text"
              name="product_name"
              value={values.product_name}
              onChange={handleChange}
              fullWidth
              label="Nama Product"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CustomSelect
              type="text"
              name="type_id"
              options={productTypeState}
              value={values.type_id}
              onChange={handleChange}
              minWidth={'100%'}
              fullWidth
              label="Kategori Product"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField type="number" name="price" value={values.price} onChange={handleChange} fullWidth label="Price" size="small" />
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

export default ProductAdd;
