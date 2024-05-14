import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const DeleteDialog = ({isOpen, value, onCancel, onDelete, valueSelect}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      BackdropProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.7)' } }}
      PaperProps={{
        elevation: 4
      }}
    >
      <DialogTitle variant="h4" mb={'20px'}>
        Konfirmasi penghapusan
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Apakah Anda yakin ingin menghapus data ini? {valueSelect ? valueSelect : value.id ?? '-'}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          <Typography variant="subtitle1" color="inherit">
            Batal
          </Typography>
        </Button>
        <Button onClick={() => onDelete(value)} color="error">
          <Typography variant="subtitle1" color="error">
            Hapus
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
