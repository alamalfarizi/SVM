import React, { useEffect } from 'react';
import PublicLayout from '../../../layout/LandingLayout';
import Hero from '../../../ui-component/landing/Hero';
import { Box, Container} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPengaduanById } from '../../../store/actions/PengaduanAction';
import CustomColumn from '../../../ui-component/CustomColumn';
import CenteredCircularProgress from '../../../ui-component/CircularProgress';

const ResultByIdPage = () => {
  const backgroundImage = 'https://res.cloudinary.com/ddugt5n5v/image/upload/v1715240242/SKRIPSI/images_dy1wrd.jpg';
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading} = useSelector((state) => state.pengaduan);
  const pengaduanState = useSelector((state) => state.pengaduan.detail);

  function transformData(data) {
    return [
      { label: 'Kode Pengaduan', value: data?.id_report, display: data?.id_report },
      { label: 'Nama Pelapor', value: data?.reporter_name, display: data?.reporter_name },
      { label: 'Tiket', value: data?.ticket, display: data?.ticket },
      {
        label: 'Identification Number',
        value: data?.identification_number,
        display: data?.identification_number
      },
      { label: 'Contact Info', value: data.contact_info, display: data.contact_info },
      { label: 'Reporter Status', value: data.reporter_status, display: data.reporter_status },
      {
        label: 'Tingkatan hasil',
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
    <PublicLayout>
      <Hero
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: '#7fc7d9',
          backgroundPosition: 'center'
        }}
      />
      <Container>
        <MainCard title="Hasil" isGoBack={true}>
          {loading ? (
            <Container align="center" sx={{ marginY: 5 }}>
              <CenteredCircularProgress />
            </Container>
          ) : pengaduanState && pengaduanState.length === 0 ? (
            <Box sx={{ marginY: 5 }}></Box>
          ) : (
            <Box sx={{ marginY: 5 }}>
              <CustomColumn dataProperties={transformData(pengaduanState)} />
            </Box>
          )}
        </MainCard>
      </Container>
    </PublicLayout>
  );
};

export default ResultByIdPage;
