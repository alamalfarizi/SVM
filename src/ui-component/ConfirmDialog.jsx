import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const ConfirmDialog = ({ isOpen, value, onCancel, onConfirm, confirmTitle, valueSelect }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      BackdropProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
      PaperProps={{
        elevation: 4
      }}
    >
      <DialogTitle variant="h4" mb={'20px'}>
        {confirmTitle}
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Apakah Anda yakin ingin {confirmTitle ?? "-"} ini ? {valueSelect ? valueSelect : value.id ?? '-'}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          <Typography variant="subtitle1" color="inherit">
            Batal
          </Typography>
        </Button>
        <Button onClick={() => onConfirm(value)} color="success">
          <Typography variant="subtitle1" color="success">
            {confirmTitle ? confirmTitle : 'Aktifkan / Nonaktifkan'}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
