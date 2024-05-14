import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import React from 'react';

const CardLanding = ({ article }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        marginY: 2,
        border: '1px solid',
        borderColor: theme.palette.error.light,
        display: { xs: 'block', md: 'flex' },
        gap: 4,
        ':hover': {
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
        }
      }}
    >
      <Box sx={{ width: '100%' }}>
        <img src={`https://sepkha.tipnl.com/${article.picture_url}`} alt="background" style={{ width: '100%', height: '100%' }} />
      </Box>
      <Box sx={{ paddingY: '20px', marginX: '20px' }}>
        <Typography variant="h2">{article.title}</Typography>
        <Typography sx={{ color: theme.palette.error.main, opacity: 0.6, fontWeight: 'bold', fontSize: '12px', mt: 1 }}>
          {article.author}
        </Typography>
        <Typography variant="h4" sx={{ mt: 2, opacity: 0.6, textAlign: 'justify' }}>
          {article.description}
        </Typography>
      </Box>
    </Card>
  );
};

export default CardLanding;
