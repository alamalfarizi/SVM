import { Grid, Typography } from '@mui/material';
import React from 'react';

const CustomColumn = ({ dataProperties }) => {
  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      {dataProperties.map((data, index) => (
        <Grid item xs={12} sm={6} md={6} key={index} sx={{ width: '100%', marginY: 1 }}>
          <Typography variant="h4" color="initial" sx={{ paddingBottom: 1 }}>
            {data.label}
          </Typography>
          <Typography variant="body1" color="initial" textAlign="justify">
            {!data.value ? '-' : data.display}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomColumn;
