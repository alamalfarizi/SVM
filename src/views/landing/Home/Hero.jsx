// mui material
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// import project
import Hero from '../../../ui-component/landing/Hero';
import SearchOne from '../../../ui-component/landing/SearchOne';

// ==============================|| HERO SECTION ||============================== //

const HeroSection = () => {
  const backgroundImage = '/public.svg';
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
        <Box sx={{ width: isMobile ? '90%' : '60%', paddingTop: isMobile ? 9 : 0 }}>
          <Typography color="inherit" variant={isMobile ? 'h4' : 'h1'}>
            Selamat Datang Di Website Pengaduan dan Pengcegahan Kekerasan Seksual di Politeknik Negeri Lhokseumawe
          </Typography>
          <Box sx={{ marginTop: isMobile ? 2 : 4 }}>
            <SearchOne />
          </Box>
        </Box>
      </Hero>
    </Box>
  );
};

export default HeroSection;
