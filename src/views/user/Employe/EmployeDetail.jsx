import { Alert, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getEmployeById } from '../../../store/actions/EmployeAction';
import CustomColumn from '../../../ui-component/CustomColumn';
import MainCard from '../../../ui-component/cards/MainCard';

export default function EmployeDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employeState = useSelector((state) => state.karyawan);

  function transformData(data) {
    return [
      { label: 'Nomor Urut Karyawan', value: data.nomor_karyawan, display: data.nomor_karyawan },
      { label: 'Nomor Identitas', value: data.nomor_identitas, display: data.nomor_identitas },
      {
        label: 'Jenis Identitas',
        value: data.jenis_identitas_from_karyawan_obj?.nama_jenis_identitas,
        display: data.jenis_identitas_from_karyawan_obj?.nama_jenis_identitas ?? '-'
      },
      { label: 'Nama Karyawan', value: data.nama_karyawan, display: data.nama_karyawan },
      {
        label: 'Jenis Kelamin Karyawan',
        value: data.jenis_kelamin_from_karyawan_obj?.nama_jenis_kelamin,
        display: data.jenis_kelamin_from_karyawan_obj?.nama_jenis_kelamin ?? '-'
      },
      { label: 'Tempat Lahir', value: data.tempat_lahir, display: data.tempat_lahir },
      { label: 'Tanggal Lahir', value: data.tanggal_lahir, display: data.tanggal_lahir ?? '-' },
      {
        label: 'Pendidikan',
        value: data.pendidikan_from_karyawan_obj?.pendidikan,
        display: data.pendidikan_from_karyawan_obj?.pendidikan ?? '-'
      },
      { label: 'Agama', value: data.agama_from_karyawan_obj?.nama_agama, display: data.agama_from_karyawan_obj?.nama_agama ?? '-' },
      {
        label: 'Status Perkawinan',
        value: data.status_perkawinan_from_karyawan_obj?.nama_status_perkawinan,
        display: data.status_perkawinan_from_karyawan_obj?.nama_status_perkawinan ?? '-'
      },
      { label: 'Telepon', value: data.telepon, display: data.telepon },
      { label: 'Email', value: data.email, display: data.email },
      {
        label: 'Desa',
        value: data.kelurahan_from_karyawan_obj?.nama_kelurahan,
        display: data.kelurahan_from_karyawan_obj?.nama_kelurahan ?? '-'
      },
      {
        label: 'Kecamatan',
        value: data.kecamatan_from_karyawan_obj?.nama_kecamatan,
        display: data.kecamatan_from_karyawan_obj?.nama_kecamatan ?? '-'
      },
      {
        label: 'Kota / Kabupaten',
        value: data.kabupaten_from_karyawan_obj?.nama_kabupaten,
        display: data.kabupaten_from_karyawan_obj?.nama_kabupaten ?? '-'
      },
      {
        label: 'Provinsi',
        value: data.provinsi_from_karyawan_obj?.nama_provinsi,
        display: data.provinsi_from_karyawan_obj?.nama_provinsi ?? '-'
      },
      {
        label: 'Jabatan',
        value: data.jabatan_from_karyawan_obj?.nama_jabatan,
        display: data.jabatan_from_karyawan_obj?.nama_jabatan ?? '-'
      },
      { label: 'Mulai Bekerja', value: data.tanggal_mulai_bekerja, display: data.tanggal_mulai_bekerja }
    ];
  }

  useEffect(() => {
    if (id) {
      dispatch(getEmployeById(id));
    }
  }, [dispatch, id]);
  return (
    <Box>
      <MainCard title="Detail Karyawan" isGoBack={true}>
        {employeState.detail ? (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {employeState.detail?.foto && (
                <img
                  crossOrigin="anonymous"
                  src={employeState.detail?.link_foto}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover'
                  }}
                />
              )}
            </Grid>
            <Grid item xs={8}>
              <CustomColumn dataProperties={transformData(employeState.detail)} />
            </Grid>
          </Grid>
        ) : (
          <Alert severity="info">Data Tidak Ada</Alert>
        )}
      </MainCard>
    </Box>
  );
}
