import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  Grid,
  Box,
  TextField,
  InputLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DialogFilters = ({ open, handleClose, title, actions }) => {
  const theme = useTheme();

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
        <DialogTitle
          id="form-dialog-title"
          variant="h4"
          sx={{
            border: '2px solid',
            borderColor: theme.palette.primary[200] + 25
          }}
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Box my={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel> Check In</InputLabel>
                <TextField type="date" sx={{ width: '100%' }} inputProps={{ min: new Date().toISOString().split('T')[0] }} />
                <InputLabel> Check Out</InputLabel>
                <TextField type="date" sx={{ width: '100%' }} inputProps={{ min: new Date().toISOString().split('T')[0] }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel> Adult</InputLabel>
                <TextField type="number" sx={{ width: '100%' }} inputProps={{ min: 0 }} />
                <InputLabel> Child</InputLabel>
                <TextField type="number" sx={{ width: '100%' }} inputProps={{ min: 0 }} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          {actions?.map((action, index) => (
            <Button key={index} onClick={action.onClick} color={action.color} variant={action.variant} disabled={action.disable}>
              {action.label}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogFilters;
