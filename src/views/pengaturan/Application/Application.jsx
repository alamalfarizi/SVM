//import mui material
import { Grid, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { Image } from '@mui/icons-material';

// third party
import { useSelector } from 'react-redux';

// components
import CustomColumn from '../../../ui-component/CustomColumn';
import MainCard from '../../../ui-component/cards/MainCard';

//======================================================|| APPLICATION ||=======================================================//
export default function ApplicationPage() {
  const appDetail = useSelector((state) => state.user.users);

  function transformData(data) {
    return [
      { label: 'Nama Lengkap', value: data?.name, display: data?.name ?? '-' },
      { label: 'Nim', value: data?.nip, display: data?.nip ?? '-' },
      {
        label: 'Username',
        value: data?.username,
        display: data?.username ?? '-'
      },
      { label: 'Email', value: data?.email, display: data?.email ?? '-' }
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
      </Box>
    </MainCard>
  );
}
