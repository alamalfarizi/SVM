import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function CustomDialog({ open, handleClose, title, content, actions, maxWidth = "md" }) {
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={maxWidth}>
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
      <DialogContent
        sx={{
          marginTop: '20px'
        }}
      >
        {content ?? 'data tidak ada'}
      </DialogContent>
      <DialogActions
        sx={{
          border: '2px solid',
          borderColor: theme.palette.primary[200] + 25
        }}
      >
        {actions?.map((action, index) => (
          <Button key={index} onClick={action?.onClick} color={action.color} variant={action.variant} disabled={action.disable}>
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
