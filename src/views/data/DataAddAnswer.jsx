import { Box, Button, Grid, TextField } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import { useDispatch } from 'react-redux';
import { submitAnswer } from '../../store/actions/AnswerAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

const DataAddAnswer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState(id);
  const [values, setValues] = useState([
    { answer_text: '', weight: '', question_id: id },
    { answer_text: '', weight: '', question_id: id },
    { answer_text: '', weight: '', question_id: id },
    { answer_text: '', weight: '', question_id: id }
  ]);

  useEffect(() => {
    console.log(id);
    setValues((prevValues) => prevValues.map((value) => ({ ...value, question_id: id })));
  }, [id]);

  const handleAnswerChange = (index, field, value) => {
    const updatedValues = [...values];
    updatedValues[index][field] = value;
    setValues(updatedValues);
  };

  const handleSubmit = () => {
    setConfirmDialog(true);
  };

  const handleconfirmSubmit = () => {
    console.log(values);
    dispatch(submitAnswer({ answer: values }))
      .unwrap()
      .then((val) => {
        console.log(val.error === false);
        if (val.error) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          setConfirmDialog(false);
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

  return (
    <MainCard title="Tambah Jawaban">
      <Box>
        <Grid container spacing={3}>
          {values.map((value, index) => (
            <Grid item sm={12} md={12} lg={12} key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <TextField
                  fullWidth
                  label={`Jawaban ${index + 1}`}
                  value={value.answer_text}
                  onChange={(e) => handleAnswerChange(index, 'answer_text', e.target.value)}
                />
                <TextField
                  type="number"
                  inputProps={{ min: 0, max: 5 }}
                  label={`Bobot ${index + 1}`}
                  value={value.weight}
                  onChange={(e) => handleAnswerChange(index, 'weight', e.target.value)}
                />
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} md={6} lg={6} />
          <Grid item xs={12} md={6} lg={6}>
            <Button variant="contained" fullWidth color="error" sx={{ borderRadius: '8px' }} onClick={handleSubmit}>
              Tambah
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          valueSelect={selectValue}
          onCancel={handleCancelSubmit}
          onConfirm={handleconfirmSubmit}
          confirmTitle="Tambah Jawaban"
        />
      )}
    </MainCard>
  );
};

export default DataAddAnswer;
