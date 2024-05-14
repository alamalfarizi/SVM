import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import MainCard from '../../../ui-component/cards/MainCard';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ToastStatus, toastNotif } from '../../../utils/Toast';
import { changePasswordUser } from '../../../store/actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { getApplication } from '../../../store/actions/ApplicationAction';

export default function AccountPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const initialValues = {
    passwordLama: '',
    passwordBaru: '',
    konfirmasiPassword: ''
  };

  const [values, setValues] = useState(initialValues);

  const appDetail = useSelector((state) => state.aplikasi.detail);

  useEffect(() => {
    dispatch(getApplication());
  }, [dispatch]);

  const handleValuesChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });

    if (prop === 'passwordBaru') {
      if (values.konfirmasiPassword !== event.target.values) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    } else if (prop === 'konfirmasiPassword') {
      if (values.passwordBaru !== event.target.value) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitAction = changePasswordUser({ id: appDetail.id_setting, formData: values });
    dispatch(submitAction)
      .unwrap()
      .then((val) => {
        if (val.success) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          setValues(initialValues);
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  function isEmptyField() {
    return !values.passwordLama || !values.passwordBaru || !values.konfirmasiPassword;
  }

  return (
    <MainCard title={'Akun'}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              size="small"
              name="password"
              autoComplete="password"
              value={values.passwordLama}
              onChange={handleValuesChange('passwordLama')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              margin="normal"
              id="outlined-basic"
              label="Password Baru"
              variant="outlined"
              type={showNewPassword ? 'text' : 'password'}
              fullWidth
              size="small"
              name="new-password"
              autoComplete="new-password"
              value={values.passwordBaru}
              onChange={handleValuesChange('passwordBaru')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              margin="normal"
              id="outlined-basic"
              label="Konfirmasi Password"
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              size="small"
              name="confirm-password"
              autoComplete="confirm-password"
              value={values.konfirmasiPassword}
              onChange={handleValuesChange('konfirmasiPassword')}
              error={!passwordsMatch}
              helperText={!passwordsMatch ? 'Passwords do not match' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button type="submit" variant="contained" color={'secondary'} sx={{ mt: 3, mb: 2 }} disabled={isEmptyField()}>
            Simpan
          </Button>
        </Box>
      </form>
    </MainCard>
  );
}
