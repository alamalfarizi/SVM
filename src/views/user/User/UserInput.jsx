import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  getRole
} from '../../../store/actions/MasterFormAction';
import { getUserById, updateUser } from '../../../store/actions/UserAction';
import CustomSelect from '../../../ui-component/CustomSelect';
import MainCard from '../../../ui-component/cards/MainCard';
import { ToastStatus, toastNotif } from '../../../utils/Toast';

export default function UserInputPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    role: '',
    keterangan: ''
  };

  const [values, setValues] = useState(initialValues);

  const userDetail = useSelector((state) => state.user.detail);
  const masterFormState = useSelector((state) => state.masterForm);

  const roleOptions = masterFormState.roles.map((item) => ({
    value: item.id_role_user,
    label: item.nama_role_user
  }));

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (masterFormState.roles.length === 0) dispatch(getRole());
  }, [masterFormState.roles, dispatch]);

  useEffect(() => {
    if (id) {
      setValues((prevValues) => ({
        ...prevValues,
        role: userDetail.role || '',
        keterangan: userDetail.keterangan || ''
      }));
    }
  }, [userDetail, id]);

  const handleValuesChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values, 'test data');
    const submitAction = updateUser({ id, formData: values });
    dispatch(submitAction)
      .unwrap()
      .then((val) => {
        if (val.success) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          handleGoBack();
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <MainCard title={'Ubah Pengguna'} isGoBack={true}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CustomSelect
              id="role-user-select"
              label="Role User"
              options={roleOptions}
              value={values.role}
              onChange={handleValuesChange('role')}
              size="small"
              minWidth={'100%'}
              margin="normal"
            />
            <TextField
              margin="normal"
              id="keterangan_user-field"
              label="Keterangan"
              variant="outlined"
              fullWidth
              name="keterangan_user"
              value={values.keterangan}
              onChange={handleValuesChange('keterangan')}
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button variant="contained" color={'grey'} sx={{ mt: 3, mb: 2, mr: 2 }} onClick={() => handleGoBack()}>
            Batal
          </Button>
          <Button type="submit" variant="contained" color={'secondary'} sx={{ mt: 3, mb: 2 }}>
            Simpan
          </Button>
        </Box>
      </form>
    </MainCard>
  );
}
