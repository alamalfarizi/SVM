// mui material
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

// project imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import MainCard from '../../ui-component/cards/MainCard';
import { getQuestionAll, submitQuestion } from '../../store/actions/QuestionAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import { useNavigate } from 'react-router';

//========================|| DATA ADD ||=================================//

const DataAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState('Pengaduan');
  const [values, setValues] = useState({
    question_text: ''
  });

  const handleCancelSubmit = () => {
    setConfirmDialog(false);
  };

  const handleConfirmSubmit = () => {
    setConfirmDialog(true);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('questionText', values.question_text);
    dispatch(submitQuestion(formData))
      .unwrap()
      .then((val) => {
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          setConfirmDialog(false);
          navigate(`/data/data-answer/${val.data.question.question_id}`);
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  useEffect(() => {
    dispatch(getQuestionAll());
  }, [dispatch]);

  return (
    <MainCard title="Tambah Data Pertanyaan" isGoBack={true}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="text"
              fullWidth
              label="Pertanyaan"
              size="small"
              value={values.question_text}
              onChange={(e) => setValues({ ...values, question_text: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} />
          <Grid item xs={12} md={6} lg={6}>
            <Button variant="contained" fullWidth color="error" sx={{ borderRadius: '8px' }} onClick={handleConfirmSubmit}>
              Tambah Pertanyaan
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          valueSelect={selectValue}
          onCancel={handleCancelSubmit}
          onConfirm={handleSubmit}
          confirmTitle="Tambah Pengaduan"
        />
      )}
    </MainCard>
  );
};

export default DataAdd;
