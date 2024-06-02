// mui material
import { Box, Button, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

// imports project
import MainCard from '../../ui-component/cards/MainCard';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import CustomSelectTwo from '../../ui-component/CustomSelectTwo';
import { getProductAll } from '../../store/actions/ProductAction';
import { submitTransaction } from '../../store/actions/TransactionAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

// ==============================|| TRANSAKSI ADD ||============================== //
const TransaksiAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState('Transaksi');
  const [transactions, setTransactions] = useState([]);
  const [productState, setProductState] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    unit_sold: ''
  });

  const productList = useSelector((state) => state.product.all);

  useEffect(() => {
    dispatch(getProductAll());
  }, [dispatch]);

  useEffect(() => {
    setProductState(productList);
  }, [productList]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedTransactions = [...transactions];
    updatedTransactions[index] = {
      ...updatedTransactions[index],
      [name]: value
    };
    setTransactions(updatedTransactions);
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
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.undefined !== undefined) {
        transaction.product_id = transaction.undefined;
        delete transaction.undefined;
      }
      const unitSold = parseFloat(transaction.unit_sold);
      const product = productState.find((item) => item.product_id === transaction.product_id);
      const productPrice = product ? parseFloat(product.price) : 0;
      const totalPrice = unitSold * productPrice;
      return {
        ...transaction,
        total_revenue: totalPrice
      };
    });

    const data = {
      transactions: {
        ...updatedTransactions
      }
    };

    dispatch(submitTransaction(data))
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

  const handleAddTransaction = () => {
    const newTrans = { ...newTransaction };
    if (newTrans.undefined !== undefined) {
      newTrans.product_id = newTrans.undefined;
      delete newTrans.undefined;
    }
    setTransactions([...transactions, newTrans]);
  };

  return (
    <>
      <MainCard title="Tambah Data Transaksi" isGoBack={true}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Button variant="contained" fullWidth color="success" sx={{ borderRadius: '8px' }} onClick={handleAddTransaction}>
              Tambah Transaksi
            </Button>
          </Grid>
        </Grid>
      </MainCard>
      <Box sx={{ m: 2 }} />
      {transactions.map((transaction, index) => (
        <MainCard key={index} title={`Transaksi ${index + 1}`}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <CustomSelectTwo
                  type="text"
                  name="product_id"
                  options={productState}
                  value={transaction.product_id}
                  onChange={(event) => handleChange(event, index)}
                  minWidth={'100%'}
                  fullWidth
                  label="Kategori Product"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  type="number"
                  name="unit_sold"
                  value={transaction.unit_sold}
                  onChange={(event) => handleChange(event, index)}
                  fullWidth
                  label="Jumlah terjual"
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      ))}
      <Box sx={{ m: 2 }} />
      <MainCard>
        <Grid item xs={12} md={6} lg={6} />
        <Grid item xs={12} md={6} lg={6}>
          <Button variant="contained" fullWidth color="success" sx={{ borderRadius: '8px' }} onClick={handleDialog}>
            Tambah Data
          </Button>
        </Grid>
      </MainCard>
      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          valueSelect={selectValue}
          onCancel={handleCancelSubmit}
          onConfirm={handleConfirmSubmit}
          confirmTitle="Tambah Data"
        />
      )}
    </>
  );
};

export default TransaksiAdd;
