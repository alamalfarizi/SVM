import { Box, CircularProgress } from '@mui/material';

function CenteredCircularProgress() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}

export default CenteredCircularProgress;