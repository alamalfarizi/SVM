// material-ui
import { Button, Grid, TextField, Box } from '@mui/material';

// project imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

// components
import { statusPengaduanOptions } from './Dummy';
import { getPengaduanById, submitPengaduan, updatePengaduan } from '../../store/actions/PengaduanAction';
import { ToastStatus, toastNotif } from '../../utils/Toast';
import CustomSelect from '../../ui-component/CustomSelect';
import MainCard from '../../ui-component/cards/MainCard';


//=================================|| DATA ADD ||=================================
const PengaduanAdd = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pengaduanState = useSelector((state) => state.pengaduan);

  //   const jenisKamarState = useSelector((state) => state.jenisKamar.all);
  //   const gedungState = useSelector((state) => state.gedung.all);
  //   const lantaiState = useSelector((state) => state.lantai.all);
  //   const jenisKamarOptions = jenisKamarState.map((roomType) => ({
  //     value: roomType.id_jenis_kamar,
  //     label: roomType.nama_jenis_kamar
  //   }));
  //   const gedungOptions = gedungState.map((gedung) => ({
  //     value: gedung.id_gedung,
  //     label: gedung.nama_gedung
  //   }));
  //   const lantaiOptions = lantaiState.map((lantai) => ({
  //     value: lantai.id_lantai,
  //     label: lantai.nama_lantai
  //   }));

  //   useEffect(() => {
  //     dispatch(getRoomTypeAll());
  //     dispatch(getBuildingAll());
  //     dispatch(getFloorAll());
  //   }, [dispatch]);

  const initialValues = {
    id_report: '',
    reporter_name: '',
    identification_number: '',
    contact_info: '',
    reporter_status: '',
    report_status: ''
  };

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (id) {
      dispatch(getPengaduanById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      setValues((prevValues) => ({
        ...prevValues,
        kode_kamar: id || '',
        nama_kamar: roomState.detail?.nama_kamar || '',
        jenis_kamar: roomState.detail?.jenis_kamar || '',
        gedung: roomState.detail?.gedung || '',
        lantai: roomState.detail?.lantai || '',
        status_aktif: roomState.detail?.status_aktif || ''
      }));
    }
  }, [pengaduanState, id]);

  const handleValuesChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    event.preventDefault();
    console.log(values);
    const submitAction = id ? updatePengaduan({ id, formData: values }) : submitPengaduan(values);
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
    <MainCard title={id ? 'Ubah Pengaduan' : 'Tambah Pengaduan'} isGoBack={true}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {!id ? (
              <TextField
                margin="normal"
                id="id_report-field"
                size="small"
                label="Kode Pengaduan"
                variant="outlined"
                fullWidth
                name="kodePengaduan"
                value={values.id_report}
                onChange={handleValuesChange('id_report')}
                autoFocus
              />
            ) : null}

            <TextField
              margin="normal"
              id="reporter_name-field"
              label="Reporter Name"
              size="small"
              variant="outlined"
              fullWidth
              name="reporterName"
              value={values.reporter_name}
              onChange={handleValuesChange('reporter_name')}
            />

            <TextField
              margin="normal"
              id="identification_number-field"
              label="Identification Number"
              size="small"
              variant="outlined"
              fullWidth
              name="identificationNumber"
              value={values.identification_number}
              onChange={handleValuesChange('identifiction_number')}
            />

            <TextField
              margin="normal"
              id="contact_info-field"
              label="Contact Info"
              size="small"
              variant="outlined"
              fullWidth
              name="contactInfo"
              value={values.contact_info}
              onChange={handleValuesChange('contact_info')}
            />

            <TextField
              margin="normal"
              id="reporter_status-field"
              label="Reporter Status"
              size="small"
              variant="outlined"
              fullWidth
              name="reporterStatus"
              value={values.reporter_status}
              onChange={handleValuesChange('reporter_status')}
            />

            <CustomSelect
              id="status-select"
              label="Status"
              options={statusPengaduanOptions}
              size="small"
              minWidth={'100%'}
              margin="normal"
              value={values.status_aktif}
              onChange={handleValuesChange('status_aktif')}
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
};

export default PengaduanAdd;
