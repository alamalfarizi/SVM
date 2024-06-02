// mui material
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// project import
import MainCard from '../../ui-component/cards/MainCard';
import CustomSelect from '../../ui-component/CustomSelect';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import { getProductAll, getProductById, updateProduct } from '../../store/actions/ProductAction';
import { productTypeGetAll } from '../../store/actions/ProductTypeAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

const ProductDetail = () => {
  const { id } = useParams();
  const cleanedId = id.replace(/[{}]/g, '');
  const dispatch = useDispatch();
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState(cleanedId);
  const [values, setValues] = useState({
    product_id: '',
    product_name: '',
    price: '',
    type_id: ''
  });

  const productState = useSelector((state) => state.product.detail);
  const productTypeState = useSelector((state) => state.productType.all);

  useEffect(() => {
    if (id) {
      const cleanedId = id.replace(/[{}]/g, '');
      dispatch(getProductById(cleanedId));
      dispatch(productTypeGetAll());
    }

    setValues({
      product_id: productState.product_id,
      product_name: productState.product_name,
      price: productState.price,
      type_id: productState.type_id
    });
  }, [dispatch, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleConfirmUpdate = () => {
    const newValues = { ...values };
    if (newValues.undefined !== undefined) {
      newValues.type_id = newValues.undefined;
      delete newValues.undefined;
    }
    const data = {
      product: {
        ...newValues
      }
    };

    dispatch(updateProduct({ id: cleanedId, data }))
      .unwrap()
      .then((val) => {
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getProductAll());
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
    <MainCard title="Product Detail" isGoBack={true}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="text"
              name="product_id"
              fullWidth
              label="Id Produk"
              disabled
              value={values.product_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="text"
              name="product_name"
              fullWidth
              label="Nama Produk"
              value={values.product_name}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="number"
              name="price"
              fullWidth
              label="Harga Produk"
              value={values.price}
              onChange={handleChange}
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
              label="Kategori Produk"
              size="small"
            />
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
          confirmTitle="Ubah Produk"
        />
      )}
    </MainCard>
  );
};

export default ProductDetail;
