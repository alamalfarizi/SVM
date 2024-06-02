// mui material
import { Box } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getTransactionById } from '../../store/actions/TransactionAction';

// ==============================|| DETAIL TRANSACTION PAGE ||============================== //
const TransaksiDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const transaksiState = useSelector((state) => state.transaction);

  useEffect(() => {
    console.log(transaksiState);
    if (id) {
      const cleanedId = id.replace(/[{}]/g, '');
     dispatch(getTransactionById(cleanedId));
    }
  }, [dispatch, id]);
  return (
    <MainCard title="Transaksi Detail" isGoBack={true}>
      <Box></Box>
    </MainCard>
  );
};

export default TransaksiDetail;
