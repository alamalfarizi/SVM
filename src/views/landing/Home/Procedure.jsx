import { Grid, Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { ADVANTAGE_DATA } from '../../../shared/constantPublic';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 3
};

const image = {
  height: 55,
  my: 2
};

function ProcedureSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box id="kelebihan_penginapan" component="section" sx={{ display: 'flex', bgcolor: 'background.paper', marginY: 5, }}>
      <Container
        sx={{
          mb: '40px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h1" marked="center" color={'error'} sx={{ mb: 4 }}>
          Penggunaan Aplikasi
        </Typography>
        <div>
          <Grid container spacing={3}>
            {ADVANTAGE_DATA.map((advantage, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={item}>
                  <Box component="img" src={advantage.image} alt="suitcase" sx={image} />
                  <Typography variant="h3" align="center" sx={{ my: 2 }}>
                    {advantage.title}
                  </Typography>
                  <Typography variant="h5" align="center">
                    {advantage.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default ProcedureSection;
