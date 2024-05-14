import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getApplication, submitApplication, updateApplication } from '../../../store/actions/ApplicationAction';
import { getKabupaten, getKecamatan, getKelurahan, getProvinsi } from '../../../store/actions/MasterFormAction';
import ImageUpload from '../../../ui-component/ImageUpload';
import MainCard from '../../../ui-component/cards/MainCard';
import { ToastStatus, toastNotif } from '../../../utils/Toast';
import CurrencyFormat from '../../../utils/CurrencyFormat';

export default function ApplicationInputPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    nama_hotel: '',
    alamat_hotel: '',
    telepon: '',
    email: '',
    kode_pos: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    ppn: '',
    denda_telat_checkout_perjam: '',
    logo: null,
    link_logo: null
  };

  const [values, setValues] = useState(initialValues);

  // const appDetail = useSelector((state) => state.aplikasi.detail);
  // const kecematanState = useSelector((state) => state.masterForm.kecamatan);
  // const kabupatenState = useSelector((state) => state.masterForm.kabupaten);
  // const provinsiState = useSelector((state) => state.masterForm.provinsi);
  // const kelurahanState = useSelector((state) => state.masterForm.kelurahan);

  // const filterKelurahan = kelurahanState.filter((item) => item.id_kecamatan === values.kecamatan);
  // const kelurahanOptions = filterKelurahan.map((item) => ({
  //   value: item.id_kelurahan,
  //   label: item.nama_kelurahan
  // }));

  // const filterKecamatan = kecematanState.filter((item) => item.id_kabupaten === values.kabupaten);
  // const kecamatanOptions = filterKecamatan.map((item) => ({
  //   value: item.id_kecamatan,
  //   label: item.nama_kecamatan
  // }));

  // const filterKabupaten = kabupatenState.filter((item) => item.id_provinsi === values.provinsi);
  // const kabupatenOptions = filterKabupaten.map((item) => ({
  //   value: item.id_kabupaten,
  //   label: item.nama_kabupaten
  // }));

  // const provinsiOptions = provinsiState.map((item) => ({
  //   value: item.id_provinsi,
  //   label: item.nama_provinsi
  // }));

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getApplication());
  //   }
  // }, [dispatch, id]);

  // useEffect(() => {
  //   if (values.kecamatan) {
  //     dispatch(getKelurahan(values.kecamatan));
  //   }
  // }, [values.kecamatan, dispatch]);

  // useEffect(() => {
  //   if (kecematanState.length === 0) {
  //     dispatch(getKecamatan());
  //   }
  // }, [kecematanState, dispatch]);

  // useEffect(() => {
  //   if (kabupatenState.length === 0) {
  //     dispatch(getKabupaten());
  //   }
  // }, [kabupatenState, dispatch]);

  // useEffect(() => {
  //   if (provinsiState.length === 0) {
  //     dispatch(getProvinsi());
  //   }
  // }, [provinsiState, dispatch]);

  // useEffect(() => {
  //   if (id) {
  //     setValues((prevValues) => ({
  //       ...prevValues,
  //       nama_hotel: appDetail.nama_hotel || '',
  //       alamat_hotel: appDetail.alamat_hotel || '',
  //       telepon: appDetail.telepon || '',
  //       email: appDetail.email || '',
  //       kode_pos: appDetail.kode_pos || '',
  //       kelurahan: appDetail.kelurahan || '',
  //       kecamatan: appDetail.kecamatan || '',
  //       kabupaten: appDetail.kabupaten || '',
  //       provinsi: appDetail.provinsi || '',
  //       ppn: appDetail.ppn || '',
  //       denda_telat_checkout_perjam: appDetail.denda_telat_checkout_perjam || '',
  //       logo: appDetail.logo || '',
  //       link_logo: appDetail.link_logo || ''
  //     }));
  //   }
  // }, [appDetail,id]);

  // const handleValuesChange = (prop) => (event) => {
  //   console.log(event.target);
  //   if (prop === 'logo') {
  //     const selectedImage = event;
  //     setValues({ ...values, [prop]: selectedImage });
  //   } else {
  //     setValues({ ...values, [prop]: event.target.value });
  //   }
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(values, 'test data');
  //   const submitAction = id ? updateApplication({ id, formData: values }) : submitApplication(values);
  //   dispatch(submitAction)
  //     .unwrap()
  //     .then((val) => {
  //       if (val.success) {
  //         toastNotif(ToastStatus.SUCCESS, val.message);
  //         handleGoBack();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toastNotif(ToastStatus.ERROR, error.message);
  //     });
  // };

  // const handleGoBack = () => {
  //   navigate(-1);
  // };

  return (
    <MainCard title={'Ubah Pengaturan Aplikasi'} isGoBack={true}>
      <form >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              id="nama-app-field"
              size="small"
              label="Nama Hotel"
              variant="outlined"
              fullWidth
              name="nama-app"
              // value={values.nama_hotel}
              // onChange={handleValuesChange('nama_hotel')}
              autoFocus
            />
            <TextField
              margin="normal"
              id="alamat-hotel-field"
              label="Alamat Hotel"
              variant="outlined"
              fullWidth
              name="alamat-hotel"
              // value={values.alamat_hotel}
              // onChange={handleValuesChange('alamat_hotel')}
              multiline
              rows={3}
            />
            <TextField
              margin="normal"
              id="phone-field"
              size="small"
              label="Telepon"
              variant="outlined"
              fullWidth
              name="phone"
              // value={values.telepon}
              // onChange={handleValuesChange('telepon')}
            />
            <TextField
              margin="normal"
              id="email-field"
              size="small"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              // value={values.email}
              // onChange={handleValuesChange('email')}
            />
            <TextField
              margin="normal"
              id="kode-pos-field"
              size="small"
              label="Kode Pos"
              variant="outlined"
              fullWidth
              name="kode-pos"
              // value={values.kode_pos}
              // onChange={handleValuesChange('kode_pos')}
            />
{/* 
            {provinsiOptions.length > 0 && (
              <Autocomplete
                size="small"
                id="provinsi"
                name="provinsi"
                options={provinsiOptions}
                getOptionLabel={(option) => option.label}
                value={provinsiOptions.find((option) => option.value === values.provinsi) || null}
                onChange={(event, newValue) => {
                  setValues({ ...values, provinsi: newValue ? newValue.value : '', kabupaten: '', kecamatan: '' });
                }}
                renderInput={(params) => <TextField {...params} margin="normal" label="Provinsi" />}
              />
            )} */}

            <Autocomplete
              // disabled={kabupatenOptions.length === 0}
              size="small"
              id="kabupaten"
              name="kabupaten"
              // options={kabupatenOptions}
              // getOptionLabel={(option) => option.label}
              // value={kabupatenOptions.find((option) => option.value === values.kabupaten) || null}
              // onChange={(event, newValue) => {
              //   setValues({ ...values, kabupaten: newValue ? newValue.value : '', kecamatan: '' });
              // }}
              // renderInput={(params) => <TextField {...params} margin="normal" label="Kabupaten" />}
            />

            <Autocomplete
              disabled={kecamatanOptions.length === 0}
              size="small"
              id="kecamatan"
              name="kecamatan"
              options={kecamatanOptions}
              getOptionLabel={(option) => option.label}
              value={kecamatanOptions.find((option) => option.value === values.kecamatan) || null}
              onChange={(event, newValue) => {
                setValues({ ...values, kecamatan: newValue ? newValue.value : '', kelurahan: '' });
              }}
              renderInput={(params) => <TextField {...params} margin="normal" label="Kecamatan" />}
            />

            <Autocomplete
              disabled={kelurahanOptions.length === 0}
              size="small"
              id="kelurahan"
              name="kelurahan"
              options={kelurahanOptions}
              getOptionLabel={(option) => option.label}
              value={kelurahanOptions.find((option) => option.value === values.kelurahan) || null}
              onChange={(event, newValue) => {
                setValues({ ...values, kelurahan: newValue ? newValue.value : '' });
              }}
              renderInput={(params) => <TextField {...params} margin="normal" label="Kelurahan" />}
            />

            <TextField
              margin="normal"
              id="ppn-field"
              size="small"
              label="PPN"
              variant="outlined"
              fullWidth
              name="ppn"
              value={values.ppn}
              onChange={handleValuesChange('ppn')}
            />
            <TextField
              margin="normal"
              id="denda_telat_checkout_perjam-field"
              size="small"
              label="Denda Telat Checkout Perjam"
              variant="outlined"
              fullWidth
              name="denda_telat_checkout_perjam"
              value={values.denda_telat_checkout_perjam}
              onChange={handleValuesChange('denda_telat_checkout_perjam')}
              InputProps={{
                inputComponent: CurrencyFormat
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <ImageUpload onImageUpload={handleValuesChange('logo')} previewImage={values.link_logo || ''} /> */}
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
