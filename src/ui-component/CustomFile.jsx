import React from 'react';
import { Button, styled } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';

const CustomFile = ({ title, mt = 2 }) => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  });

  return (
    <Button
      sx={{ mt }}
      component="label"
      role={undefined}
      variant="contained"
      color="secondary"
      tabIndex={-1}
      startIcon={<CloudUploadOutlined />}
    >
       { title }
      <VisuallyHiddenInput type="file" />
    </Button>
  );
};

export default CustomFile;
