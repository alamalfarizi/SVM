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
            © {currentYear} Suci Rizkia. All rights reserved
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default FooterPublicLayout;
