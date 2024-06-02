// mui material
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// import project
import Hero from '../../../ui-component/landing/Hero';
import SearchOne from '../../../ui-component/landing/SearchOne';

// ==============================|| HERO SECTION ||============================== //

const HeroSection = () => {
  const backgroundImage = '/Coffe.jpg';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box id="hero">
      <Hero
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: '#7fc7d9',
          backgroundPosition: 'center'
        }}
      >
        <Box>
          <Typography color="inherit" variant={isMobile ? 'h4' : 'h1'}>
            Selamat Datang di Sistem Prediksi Penjualan Produk Terlaris Pada COFFEE SHOP
          </Typography>
          <Box sx={{ marginTop: isMobile ? 2 : 4 }}>
            <SearchOne />
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h1" color={'inherit'}>
              HAI INI ADALAH CONTAINER
            </Typography>
          </Box>
        </Box>
      </Hero>
    </Box>
  );
};

export default HeroSection;
