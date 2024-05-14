import { Box, Container, Typography, Divider } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Instagram, X, Facebook } from '@mui/icons-material';

const FooterPublicLayout = () => {
  const theme = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Container>
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h3" component="h3" color={theme.palette.error.main}>
            Pengaduan Dan Pencegahan
          </Typography>
          <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ width: '100%' }}>
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: theme.palette.grey[500], textAlign: 'left', width: { md: '60%', xs: '90%' } }}
              >
                Sistem Pengaduan dan Pencegahan Kekerasan Seksual di Politeknik Negeri Lhokseumawe
              </Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant="h6"
                component="h6"
                sx={{ color: theme.palette.grey[500], textAlign: 'left', width: { md: '60%', xs: '100%' } }}
              >
                Jl. Medan - Banda Aceh, Bukit Rata, Blang Mangat, Lhokseumawe, Aceh - indonesia Phone : +62 888 8888 8888
              </Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h4" component="h4">
                {' '}
                Social Media
              </Typography>

              <Box sx={{ flexDirection: 'column', display: 'flex', gap: '5px', mt: '10px' }}>
                <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Instagram sx={{ color: theme.palette.grey[500], height: '20px', width: '20px' }} />
                  <Typography variant="h6" component="h6" sx={{ color: theme.palette.grey[500] }}>
                    Instagram
                  </Typography>
                </Link>
                <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <X sx={{ color: theme.palette.grey[500], height: '20px', width: '20px' }} />
                  <Typography variant="h6" component="h6" sx={{ color: theme.palette.grey[500] }}>
                    Twitter
                  </Typography>
                </Link>
                <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Facebook sx={{ color: theme.palette.grey[500], height: '20px', width: '20px' }} />
                  <Typography variant="h6" component="h6" sx={{ color: theme.palette.grey[500] }}>
                    Facebook
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ marginTop: '20px' }} />
        <Box
          sx={{
            height: '50px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Typography variant="h6" component="h6" color={theme.palette.grey[500]}>
            © {currentYear} Sepkha Ayunda Sari. All rights reserved
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default FooterPublicLayout;
