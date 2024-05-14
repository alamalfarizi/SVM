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
import { getPengaduanAll } from '../../store/actions/PengaduanAction';

//========================|| DATA ADD ||=================================//

const DataAdd = () => {
  const dispatch = useDispatch();
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState('Pengaduan');
  const [values, setValues] = useState({
    question_text: '',
    answer: [
      {
        answer_text: '',
        weight: ''
      },
      {
        answer_text: '',
        weight: ''
      },
      {
        answer_text: '',
        weight: ''
      },
      {
        answer_text: '',
        weight: ''
      }
    ]
  });

  const pengaduanState = useSelector((state) => state.question);

  const handleInputChange = (index) => (event) => {
    const { name, value } = event.target;
    const updatedValues = { ...values };
    updatedValues.answer[index][name] = value;
    setValues(updatedValues);
  };

  const handleCancelSubmit = () => {
    setConfirmDialog(false);
  };

  const handleConfirmSubmit = () => {
    setConfirmDialog(true);
  };

  const handleSubmit = () => {
    console.log(values);
    dispatch(submitQuestion({
      formData: {
        question_text: values.question_text,
        answer: values.answer
      }
    }))
      .unwrap()
      .then((val) => {
        console.log(val);
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          setConfirmDialog(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  useEffect(() => {
  console.log(pengaduanState)
    dispatch(getQuestionAll())
  },[dispatch])

  return (
    <MainCard title="Data Add" isGoBack={true}>
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
          <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              <TextField
                type="text"
                fullWidth
                label="Jawaban 1"
                size="small"
                name="answer_text"
                value={values.answer[0].answer_text}
                onChange={handleInputChange(0)}
              />
              <TextField
                type="number"
                label="Bobot"
                size="small"
                name="weight"
                inputProps={{ min: 0, max: 5 }}
                value={values.answer[0].weight}
                onChange={handleInputChange(0)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              <TextField
                type="text"
                fullWidth
                label="Jawaban 2"
                size="small"
                name="answer_text"
                value={values.answer[1].answer_text}
                onChange={handleInputChange(1)}
              />
              <TextField
                type="number"
                label="Bobot"
                size="small"
                name="weight"
                inputProps={{ min: 0, max: 5 }}
                value={values.answer[1].weight}
                onChange={handleInputChange(1)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              <TextField
                type="text"
                fullWidth
                label="Jawaban 3"
                size="small"
                name="answer_text"
                value={values.answer[2].answer_text}
                onChange={handleInputChange(2)}
              />
              <TextField
                type="number"
                label="Bobot"
                size="small"
                name="weight"
                inputProps={{ min: 0, max: 5 }}
                value={values.answer[2].weight}
                onChange={handleInputChange(2)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              <TextField
                type="text"
                fullWidth
                label="Jawaban 4"
                size="small"
                name="answer_text"
                value={values.answer[3].answer_text}
                onChange={handleInputChange(3)}
              />
              <TextField
                type="number"
                label="Bobot"
                size="small"
                name="weight"
                inputProps={{ min: 0, max: 5 }}
                value={values.answer[3].weight}
                onChange={handleInputChange(3)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} />
          <Grid item xs={12} md={6} lg={6}>
            <Button variant="contained" fullWidth color="error" sx={{ borderRadius: '8px' }} onClick={handleConfirmSubmit}>
              Ubah
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
