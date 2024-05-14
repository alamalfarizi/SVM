import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getApplication, updateApplication } from '../../../store/actions/ApplicationAction';
import {
  getEducation,
  getGender,
  getPosition,
  getKabupaten,
  getKecamatan,
  getKelurahan,
  getProvinsi,
  getReligion,
  getRole,
  getStatusPerkawinan,
  getTypeIdentity
} from '../../../store/actions/MasterFormAction';
import ImageUpload from '../../../ui-component/ImageUpload';
import MainCard from '../../../ui-component/cards/MainCard';
import { ToastStatus, toastNotif } from '../../../utils/Toast';
import CustomSelect from '../../../ui-component/CustomSelect';
import { getEmployeById, submitEmploye, updateEmploye } from '../../../store/actions/EmployeAction';

export default function EmployeInputPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    nomor_karyawan: '',
    nomor_identitas: '',
    jenis_identitas: '',
    nama_karyawan: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    pendidikan: '',
    agama: '',
    status_perkawinan: '',
    telepon: '',
    email: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
    jabatan: '',
    tanggal_mulai_bekerja: '',
    role_user: '',
    keterangan_user: '',
    logo: null,
    link_logo: null
  };

  const [values, setValues] = useState(initialValues);

  const employeDetail = useSelector((state) => state.karyawan.detail);
  const kelurahanState = useSelector((state) => state.masterForm.kelurahan);
  const kecematanState = useSelector((state) => state.masterForm.kecamatan);
  const kabupatenState = useSelector((state) => state.masterForm.kabupaten);
  const provinsiState = useSelector((state) => state.masterForm.provinsi);
  const masterFormState = useSelector((state) => state.masterForm);

  const genderOptions = masterFormState.genders.map((item) => ({
    value: item.id_jenis_kelamin,
    label: item.nama_jenis_kelamin
  }));

  const religionOptions = masterFormState.religions.map((item) => ({
    value: item.id_agama,
    label: item.nama_agama
  }));

  const typeIdentityOptions = masterFormState.typeIdentities.map((item) => ({
    value: item.id_jenis_identitas,
    label: item.nama_jenis_identitas
  }));

  const positionOptions = masterFormState.positions.map((item) => ({
    value: item.id_jabatan,
    label: item.nama_jabatan
  }));

  const roleOptions = masterFormState.roles.map((item) => ({
    value: item.id_role_user,
    label: item.nama_role_user
  }));

  const educationOptions = masterFormState.educations.map((item) => ({
    value: item.id,
    label: item.pendidikan
  }));

  const statusPerkawinanOptions = masterFormState.statusPerkawinan.map((item) => ({
    value: item.id_status_perkawinan,
    label: item.nama_status_perkawinan
  }));

  const filterKelurahan = kelurahanState.filter((item) => item.id_kecamatan === values.kecamatan);
  const kelurahanOptions = filterKelurahan.map((item) => ({
    value: item.id_kelurahan,
    label: item.nama_kelurahan
  }));

  const filterKecamatan = kecematanState.filter((item) => item.id_kabupaten === values.kabupaten);
  const kecamatanOptions = filterKecamatan.map((item) => ({
    value: item.id_kecamatan,
    label: item.nama_kecamatan
  }));

  const filterKabupaten = kabupatenState.filter((item) => item.id_provinsi === values.provinsi);
  const kabupatenOptions = filterKabupaten.map((item) => ({
    value: item.id_kabupaten,
    label: item.nama_kabupaten
  }));

  const provinsiOptions = provinsiState.map((item) => ({
    value: item.id_provinsi,
    label: item.nama_provinsi
  }));

  useEffect(() => {
    if (id) {
      dispatch(getEmployeById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (masterFormState.genders.length === 0) dispatch(getGender());
  }, [masterFormState.genders, dispatch]);

  useEffect(() => {
    if (masterFormState.religions.length === 0) dispatch(getReligion());
  }, [masterFormState.religions, dispatch]);

  useEffect(() => {
    if (masterFormState.typeIdentities.length === 0) dispatch(getTypeIdentity());
  }, [masterFormState.typeIdentities, dispatch]);

  useEffect(() => {
    if (masterFormState.positions.length === 0) dispatch(getPosition());
  }, [masterFormState.positions, dispatch]);

  useEffect(() => {
    if (masterFormState.roles.length === 0) dispatch(getRole());
  }, [masterFormState.roles, dispatch]);

  useEffect(() => {
    if (masterFormState.educations.length === 0) dispatch(getEducation());
  }, [masterFormState.educations, dispatch]);

  useEffect(() => {
    if (masterFormState.statusPerkawinan.length === 0) dispatch(getStatusPerkawinan());
  }, [masterFormState.statusPerkawinan, dispatch]);

  useEffect(() => {
    if (provinsiState.length === 0) {
      dispatch(getProvinsi());
    }
  }, [provinsiState, dispatch]);

  useEffect(() => {
    if (kabupatenState.length === 0) {
      dispatch(getKabupaten());
    }
  }, [kabupatenState, dispatch]);

  useEffect(() => {
    if (kecematanState.length === 0) {
      dispatch(getKecamatan());
    }
  }, [kecematanState, dispatch]);

  useEffect(() => {
    if (values.kecamatan) {
      dispatch(getKelurahan(values.kecamatan));
    }
  }, [values.kecamatan, dispatch]);
  
  useEffect(() => {
    if (id) {
      setValues((prevValues) => ({
        ...prevValues,
        nomor_karyawan: id || '',
        nomor_identitas: employeDetail.nomor_identitas || '',
        jenis_identitas: employeDetail.jenis_identitas || '',
        nama_karyawan: employeDetail.nama_karyawan || '',
        jenis_kelamin: employeDetail.jenis_kelamin || '',
        tempat_lahir: employeDetail.tempat_lahir || '',
        tanggal_lahir: employeDetail.tanggal_lahir || '',
        pendidikan: employeDetail.pendidikan || '',
        agama: employeDetail.agama || '',
        status_perkawinan: employeDetail.status_perkawinan || '',
        telepon: employeDetail.telepon || '',
        email: employeDetail.email || '',
        provinsi: employeDetail.provinsi || '',
        kabupaten: employeDetail.kabupaten || '',
        kecamatan: employeDetail.kecamatan || '',
        kelurahan: employeDetail.kelurahan || '',
        jabatan: employeDetail.jabatan || '',
        tanggal_mulai_bekerja: employeDetail.tanggal_mulai_bekerja || '',
        role_user: employeDetail.role_user || '',
        keterangan_user: employeDetail.keterangan_user || '',
        foto: employeDetail.foto || '',
        link_foto: employeDetail.link_foto || ''
      }));
    }
  }, [employeDetail, id]);

  const handleValuesChange = (prop) => (event) => {
    if (prop === 'foto') {
      const selectedImage = event;
      setValues({ ...values, [prop]: selectedImage });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values, 'test data');
    const submitAction = id ? updateEmploye({ id, formData: values }) : submitEmploye(values);
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
    <MainCard title={id ? 'Ubah Karyawan' : 'Tambah Karyawan'} isGoBack={true}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {!id ? (
              <TextField
                margin="normal"
                id="nomor-karyawan-field"
                size="small"
                label="Nomor Karyawan"
                variant="outlined"
                fullWidth
                name="nomer-karyawan"
                value={values.nomor_karyawan}
                onChange={handleValuesChange('nomor_karyawan')}
                autoFocus
              />
            ) : null}
            <TextField
              margin="normal"
              id="nomor-identitas-field"
              size="small"
              label="Nomor Identitas"
              variant="outlined"
              fullWidth
              name="nomor-identitas"
              value={values.nomor_identitas}
              onChange={handleValuesChange('nomor_identitas')}
            />
            <CustomSelect
              id="jenis-identitas-select"
              label="Jenis Identitas"
              options={typeIdentityOptions}
              value={values.jenis_identitas}
              onChange={handleValuesChange('jenis_identitas')}
              size="small"
              minWidth={'100%'}
              margin="normal"
            />
            <TextField
              margin="normal"
              id="nama-karyawan-field"
              size="small"
              label="Nama Karyawan"
              variant="outlined"
              fullWidth
              name="nama-karyawan"
              value={values.nama_karyawan}
              onChange={handleValuesChange('nama_karyawan')}
            />
            <CustomSelect
              id="jenis-kelamin-select"
              label="Jenis Kelamin"
              options={genderOptions}
              value={values.jenis_kelamin}
              onChange={handleValuesChange('jenis_kelamin')}
              size="small"
              minWidth={'100%'}
              margin="normal"
            />
            <TextField
              margin="normal"
              id="tempat-lahir-field"
              size="small"
              label="Tempat Lahir"
              variant="outlined"
              fullWidth
              name="tempat-lahir"
              value={values.tempat_lahir}
              onChange={handleValuesChange('tempat_lahir')}
            />
            <TextField
              margin="normal"
              id="tanggal-lahir-field"
              label="Tanggal Lahir"
              type="date"
              fullWidth
              size="small"
              name="tanggal-lahir"
              value={values.tanggal_lahir}
              onChange={handleValuesChange('tanggal_lahir')}
              InputLabelProps={{
                shrink: true
              }}
            />
            <CustomSelect
              id="pendidikan-select"
              label="Pendidikan"
              options={educationOptions}
              value={values.pendidikan}
              onChange={handleValuesChange('pendidikan')}
              size="small"
              minWidth={'100%'}
              margin="normal"
            />
            <CustomSelect
              id="agama-select"
              label="Agama"
              options={religionOptions}
              value={values.agama}
              onChange={handleValuesChange('agama')}
              size="small"
              minWidth={'100%'}
              margin="normal"
            />
            <CustomSelect
              id="status-perkawinan-select"
              label="Status Perkawinan"
              options={statusPerkawinanOptions}
              value={values.status_perkawinan}
              onChange={handleValuesChange('status_perkawinan')}
              size="small"
              minWidth={'100%'}
              margin="normal"
            />
            <TextField
              margin="normal"
              id="telepon-field"
              size="small"
              label="Telepon"
              variant="outlined"
              fullWidth
              name="telepon"
              value={values.telepon}
              onChange={handleValuesChange('telepon')}
            />
            <TextField
              margin="normal"
              id="email-field"
              size="small"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={values.email}
              onChange={handleValuesChange('email')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {provinsiOptions.length > 0 && (
              <Autocomplete
                size="small"
                id="provinsi"
                name="provinsi"
                options={provinsiOptions}
                getOptionLabel={(option) => option.label}
                value={provinsiOptions.find((option) => option.value === values.provinsi) || null}
                onChange={(event, newValue) => {
                  setValues({ ...values, provinsi: newValue ? newValue.value : '', kabupaten: '', kecamatan: '', kelurahan: '' });
                  console.log(newValue);
                  console.log(event);
                }}
                renderInput={(params) => <TextField {...params} margin="normal" label="Provinsi" />}
              />
            )}
            <Autocomplete
              disabled={kabupatenOptions.length === 0}
              size="small"
              id="kabupaten"
              name="kabupaten"
              options={kabupatenOptions}
              getOptionLabel={(option) => option.label}
              value={kabupatenOptions.find((option) => option.value === values.kabupaten) || null}
              onChange={(event, newValue) => {
                setValues({ ...values, kabupaten: newValue ? newValue.value : '', kecamatan: '', kelurahan: '' });
              }}
              renderInput={(params) => <TextField {...params} margin="normal" label="Kabupaten" />}
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

            {positionOptions.length > 0 && (
              <Autocomplete
                size="small"
                id="jabatan"
                name="jabatan"
                options={positionOptions}
                getOptionLabel={(option) => option.label}
                value={positionOptions.find((option) => option.value === values.jabatan) || null}
                onChange={(event, newValue) => {
                  setValues({ ...values, jabatan: newValue ? newValue.value : '' });
                }}
                renderInput={(params) => <TextField {...params} margin="normal" label="Jabatan" />}
              />
            )}

            <TextField
              margin="normal"
              id="tanggal-mulai-bekerja-field"
              label="Tanggal Mulai Bekerja"
              type="date"
              fullWidth
              size="small"
              name="tanggal-mulai-bekerja"
              value={values.tanggal_mulai_bekerja}
              onChange={handleValuesChange('tanggal_mulai_bekerja')}
              InputLabelProps={{
                shrink: true
              }}
            />

            {!id ? (
              <CustomSelect
                id="role-user-select"
                label="Role User"
                options={roleOptions}
                value={values.role_user}
                onChange={handleValuesChange('role_user')}
                size="small"
                minWidth={'100%'}
                margin="normal"
              />
            ) : null}
            {!id ? (
              <TextField
                margin="normal"
                id="keterangan_user-field"
                label="Keterangan"
                variant="outlined"
                fullWidth
                name="keterangan_user"
                value={values.keterangan_user}
                onChange={handleValuesChange('keterangan_user')}
                multiline
                rows={3}
              />
            ) : null}
            <ImageUpload onImageUpload={handleValuesChange('foto')} previewImage={values.link_foto || ''} />
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
