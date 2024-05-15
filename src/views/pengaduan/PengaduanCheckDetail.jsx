// material-ui
import { Container, Box } from '@mui/material';

// project imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { getPengaduanById } from '../../store/actions/PengaduanAction';

// components
import MainCard from '../../ui-component/cards/MainCard';
import TextFieldCustom from '../../ui-component/TextField';
import CenteredCircularProgress from '../../ui-component/CircularProgress';

const DataCheckDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.pengaduan);
  const pengaduanState = useSelector((state) => state.pengaduan.detail);

  function transformData(data) {
    return [
      { label: 'Kode Pengaduan', value: data.id_report, display: data.id_report },
      { label: 'Nama Pelapor', value: data.reporter_name, display: data.reporter_name },
      {
        label: 'Nomor Identitas',
        value: data.identification_number,
        display: data.identification_number
      },
      {
        label: 'Nomor Tiket ',
        value: data.ticket,
        display: data.ticket
      },
      { label: 'Info Kontak', value: data.contact_info, display: data.contact_info },
      { label: 'Status Pelapor', value: data.reporter_status, display: data.reporter_status },
      {
        label: 'Status Pengaduan',
        value: data.report_status === 'waiting' ? 'Waiting' : 'Success',
        display: data.report_status === 'waiting' ? 'Waiting' : 'Success'
      },
      {
        label: 'Tingkatan Cluster',
        value: data?.cluster?.cluster_level,
        display: data?.cluster?.cluster_level
      },
      {
        label: 'Hasil Clustering',
        value: data?.cluster?.cluster_action,
        display: data?.cluster?.cluster_action
      }
    ];
  }

  useEffect(() => {
    if (id) {
      dispatch(getPengaduanById(id));
    }
  }, [dispatch, id]);

  return (
    <Box>
      <MainCard title="Detail Pengaduan" isGoBack={true}>
        {loading ? (
          <Container>
            <CenteredCircularProgress />
          </Container>
        ) : (
          <TextFieldCustom dataProperties={transformData(pengaduanState)} />
        )}
      </MainCard>
    </Box>
  );
};

export default DataCheckDetail;
