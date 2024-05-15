import { Alert, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { statusReportOptions } from './Dummy';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionAll } from '../../../store/actions/QuestionAction';
import { submitPengaduan } from '../../../store/actions/PengaduanAction';
import { toastNotif, ToastStatus } from '../../../utils/Toast';

import PublicLayout from '../../../layout/LandingLayout';
import SubCard from '../../../ui-component/cards/SubCard';
import Hero from '../../../ui-component/landing/Hero';
import ConfirmDialog from '../../../ui-component/ConfirmDialog';
import CustomSelect from '../../../ui-component/CustomSelect';
import { useNavigate } from 'react-router';
import CenteredCircularProgress from '../../../ui-component/CircularProgress';

const ComplaintPage = () => {
  const backgroundImage = '/public.svg';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const initialValues = {
    reporterName: '',
    identificationNumber: '',
    contact: '',
    reporterStatus: '',
    answer: '[]'
  };
  const [values, setValues] = useState(initialValues);
  const [selectedWeights, setSelectedWeights] = useState({});
  const selectedWeightsArray = Object.values(selectedWeights);
  const [selectValue, setSelectValue] = useState('Pengaduan');

  const { loading, error } = useSelector((state) => state.question);
  const rows = useSelector((state) => state.question.all);

  const handleValuesChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleCustomSelectChange = (question_id) => (event) => {
    setSelectedWeights({ ...selectedWeights, [question_id]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmDialog(true);
  };

  useEffect(() => {
    const updatedValues = { ...values, answer: JSON.stringify(selectedWeightsArray) };
    setValues(updatedValues);
  }, [selectedWeights]);

  const handleConfirmSubmit = () => {
    console.log(values);
    dispatch(submitPengaduan(values))
      .unwrap()
      .then((val) => {
        console.log(val);
        if (val.error === true) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getQuestionAll());
          setConfirmDialog(false);
          navigate(`/result/${val.data.report.id_report}`);
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  const handleCancelSubmit = () => {
    setConfirmDialog(false);
  };

  useEffect(() => {
    console.log(rows);
    dispatch(getQuestionAll());
  }, [dispatch]);

  return (
    <PublicLayout>
      <Hero
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: '#7fc7d9',
          backgroundPosition: 'center'
        }}
      />
      <Container>
        <form onSubmit={handleSubmit}>
          <SubCard sx={{ padding: 3 }}>
            <Typography variant="h3" color="error.main" sx={{ marginY: 2 }}>
              Identitas
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  id="reporter_name-field"
                  label="Nama Pelapor"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="reporterName"
                  multiline
                  value={values.reporterName}
                  onChange={handleValuesChange('reporterName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  id="identification_number-field"
                  label="Nomor Identitas"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="identificationNumber"
                  multiline
                  value={values.identificationNumber}
                  onChange={handleValuesChange('identificationNumber')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  id="contact_info-field"
                  label="Email"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="contactInfo"
                  multiline
                  value={values.contact}
                  onChange={handleValuesChange('contact')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  id="reporter_status-select"
                  label="Status Pelapor"
                  options={statusReportOptions}
                  size="small"
                  minWidth={'100%'}
                  margin="normal"
                  value={values.reporterStatus}
                  onChange={handleValuesChange('reporterStatus')}
                />
              </Grid>
            </Grid>
            <Typography variant="h3" color="error.main" sx={{ marginY: 2 }}>
              Pertanyaan
            </Typography>
            <Grid container spacing={3}>
              {loading ? (
                <Container align="center" sx={{marginY: 5}}>
                  <CenteredCircularProgress />
                </Container>
              ) : error ? (
                <Box sx={{marginY: 5}}>
                  <Alert severity="error">Error : {error}</Alert>
                </Box>
              ) : rows && rows?.length === 0 ? (
                <Box sx={{marginY: 5}}>
                  <Alert severity="info">Data Kosong</Alert>
                </Box>
              ) : (
                rows?.map((row) => (
                  <Grid item xs={12} md={12} key={row.question_id}>
                    <Typography>{row.question_text}</Typography>
                    <CustomSelect
                      id={`answer-select-${row.question_id}`}
                      options={row.answers.map((answer) => ({
                        label: answer.answer_text,
                        value: answer.weight
                      }))}
                      size="small"
                      minWidth={'100%'}
                      margin="normal"
                      multiline
                      value={selectedWeights[row.question_id] || ''}
                      onChange={handleCustomSelectChange(row.question_id)}
                    />
                  </Grid>
                ))
              )}
              <Grid item xs={12} md={6} />
              <Grid item xs={12} md={6}>
                <Button fullWidth type="submit" variant="contained" color="error" sx={{ borderRadius: '8px !important', py: 1.5 }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </SubCard>
        </form>
      </Container>
      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          valueSelect={selectValue}
          onCancel={handleCancelSubmit}
          onConfirm={handleConfirmSubmit}
          confirmTitle="Tambah Pengaduan"
        />
      )}
    </PublicLayout>
  );
};

export default ComplaintPage;
