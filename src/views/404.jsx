import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound404() {
  // const userToken = localStorage.getItem('userToken');

  // function handleRoute() {
  //   console.log(userToken,"test");
  //   if (userToken) {
  //     return '/admin/dashboard';
  //   } else {
  //     return '/';
  //   }
  // }
  return (
    <Box sx={{ height: '100vh' }} display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        {/* {props.image && (
          <Box sx={{ img: { width: '100px', height: '90px' } }}>
            <img src={props.image} alt={props.title} />
          </Box>
        )} */}
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '16px', sm: '20px' },
            my: '10px',
            fontWeight: 'bold'
          }}
          data-cy="not-found"
        >
          Halaman Tidak Ditemukan
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '12px', sm: '16px' },
            my: '10px',
            fontWeight: 'bold',
            color: '#9A9A9A'
          }}
        >
          Halaman yang Anda cari tidak ditemukan
        </Typography>
        <Button component={Link} to='/' variant="contained" sx={{ mt: '50px' }}>
          <Typography variant="subtitle2">OK</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default NotFound404;
