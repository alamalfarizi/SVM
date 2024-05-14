import { Grid, TextField } from '@mui/material';
import React from 'react';

const TextFieldCustom = ({ dataProperties }) => {
  return (
    <Grid container spacing={2}>
      {dataProperties.map((data, index) => (
        <Grid item xs={12} sm={12} md={12} key={index} sx={{ width: '100%', marginY: 1 }}>
          <TextField
            type="text"
            fullWidth
            disabled
            size="small"
            multiline
            label={data.label}
            value={data.value}
            sx={{ textAlign: 'justify' }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TextFieldCustom;
