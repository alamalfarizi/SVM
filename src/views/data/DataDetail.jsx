// mui material
import { Box, Button, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionById, updateQuestion } from '../../store/actions/QuestionAction';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import { toastNotif, ToastStatus } from '../../utils/Toast';

// ==============================|| DATA DETAIL ||============================== //
const DataDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState(id);
  const [isConfirmDialog, setConfirmDialog] = useState(false);

  const [updated, setUpdated] = useState({
    question_id: '',
    question_text: '',
    answers: []
  });

  const questionState = useSelector((state) => state.question.detail);

  useEffect(() => {
    console.log('control', questionState);
    if (id) {
      dispatch(getQuestionById(id));
    }
    setUpdated({
      question_id: questionState.question_id,
      question_text: questionState.question_text,
      answers: questionState.answers
    });
  }, [dispatch, id]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...updated.answers];
    updatedAnswers[index] = { ...updatedAnswers[index], answer_text: value };
    setUpdated({ ...updated, answers: updatedAnswers });
  };

  const handleWeightChange = (index, value) => {
    const parsedWight = parseInt(value);
    const updatedAnswers = [...updated.answers];
    updatedAnswers[index] = { ...updatedAnswers[index], weight: parsedWight };
    setUpdated({ ...updated, answers: updatedAnswers });
  };

  const handleConfirmUpdate = () => {
    console.log(updated);
    dispatch(updateQuestion({ id, formData: updated }))
      .unwrap()
      .then((val) => {
        console.log(val);
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          dispatch(getQuestionById(id));
          setConfirmDialog(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toastNotif(ToastStatus.ERROR, error.message);
      });
  };

  const handleUpdateQuestion = () => {
    setConfirmDialog(true);
  };

  const handleCancelUpdate = () => {
    setConfirmDialog(false);
  };

  return (
    <MainCard title="Data Detail" isGoBack={true}>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="number"
              disabled
              fullWidth
              label="Kode Pertanyaan"
              value={updated.question_id || ''}
              onChange={(e) => setUpdated({ ...updated, question_id: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="text"
              fullWidth
              label="Pertanyaan"
              value={updated.question_text || ''}
              onChange={(e) => setUpdated({ ...updated, question_text: e.target.value })}
            />
          </Grid>
          {updated?.answers?.map((answer, index) => (
            <Grid item xs={12} md={12} lg={12} key={answer.answer_id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <TextField
                  fullWidth
                  label={`Jawaban ${index + 1}`}
                  value={answer.answer_text || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 5 } }}
                  label={`Bobot ${index + 1}`}
                  value={answer.weight || ''}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                />
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} md={6} lg={6} />
          <Grid item xs={12} md={6} lg={6}>
            <Button variant="contained" fullWidth color="error" sx={{ borderRadius: '8px' }} onClick={handleUpdateQuestion}>
              Ubah
            </Button>
          </Grid>
        </Grid>
      </Box>

      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          valueSelect={selectValue}
          onCancel={handleCancelUpdate}
          onConfirm={handleConfirmUpdate}
          confirmTitle="Ubah Data"
        />
      )}
    </MainCard>
  );
};

export default DataDetail;
