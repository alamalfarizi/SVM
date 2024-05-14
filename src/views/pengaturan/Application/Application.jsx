import { Alert, Button, Grid, Icon } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomColumn from '../../../ui-component/CustomColumn';
import MainCard from '../../../ui-component/cards/MainCard';
import { Box } from '@mui/system';
import { Image } from '@mui/icons-material';
import { getUserById } from '../../../store/actions/UserAction';
import { getQuestionAll } from '../../../store/actions/QuestionAction';

export default function ApplicationPage() {
  const dispatch = useDispatch();
  const appDetail = useSelector((state) => state.question.all);
  const id = 9;

  useEffect(() => {
    console.log(appDetail);
    dispatch(getQuestionAll());
  }, [dispatch]);

  function transformData(data) {
    return [
      { label: 'Nama Lengkap', value: data?.user?.name, display: data?.user?.name ?? '-' },
      { label: 'Nim', value: data?.user?.nim, display: data?.user?.nim ?? '-' },
      {
        label: 'Username',
        value: data?.user?.username,
        display: data?.user?.username ?? '-'
      },
      { label: 'Email', value: data?.email, display: data?.email ?? '-' },

      {
        label: 'Kelurahan',
        value: data?.kelurahan_from_setting_aplikasi_obj?.nama_kelurahan ?? '',
        display: data?.kelurahan_from_setting_aplikasi_obj?.nama_kelurahan ?? '-'
      },
      {
        label: 'Kecamatan',
        value: data?.kecamatan_from_setting_aplikasi_obj?.nama_kecamatan ?? '',
        display: data?.kecamatan_from_setting_aplikasi_obj?.nama_kecamatan ?? '-'
      }
    ];
  }

  return (
    <MainCard title={'Pengaturan Aplikasi'}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {appDetail?.logo ? (
              <img
                crossOrigin="anonymous"
                src={appDetail?.link_logo}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <Icon
                component={Image}
                style={{
                  width: '100%',
                  fontSize: '180px',
                  objectFit: 'cover'
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomColumn dataProperties={transformData(appDetail)} />
          </Grid>
        </Grid>

        <Button
          component={Link}
          to={{ pathname: appDetail ? `/pengaturan/aplikasi/edit/${appDetail.id_setting}` : `/pengaturan/aplikasi/add` }}
          variant="contained"
          color={'secondary'}
          sx={{ my: 3, float: 'right' }}
        >
          {appDetail ? 'Ubah' : 'Buat'}
        </Button>
      </Box>
    </MainCard>
  );
}
