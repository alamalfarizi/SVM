// mui material
import { Box, Button, Grid, TextField } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import { submitArticle } from '../../store/actions/ArticleAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';

//========================|| ARTICLE ADD ||=================================//
const ArticleAdd = () => {
  const dispatch = useDispatch();
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState('Artikel');
  const [values, setValues] = useState({
    title: '',
    description: '',
    author: '',
    picture: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setValues({ ...values, picture: event.target.files[0] });
  };

  const handleDialog = () => {
    setConfirmDialog(true);
  };

  const handleCancelSubmit = () => {
    setConfirmDialog(false);
  };

  const handleConfirmSubmit = () => {
    console.log(values);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('author', values.author);
    formData.append('picture', values.picture);
    dispatch(submitArticle(formData))
      .unwrap()
      .then((val) => {
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

  return (
    <MainCard title="Add Article" isGoBack={true}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField type="text" name="title" value={values.title} onChange={handleChange} fullWidth label="Judul" size="small" />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              fullWidth
              label="Deskripsi"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField type="text" name="author" value={values.author} onChange={handleChange} fullWidth label="Author" size="small" />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField type="file" fullWidth size="small" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12} md={6} lg={6} />
          <Grid item xs={12} md={6} lg={6}>
            <Button variant="contained" fullWidth color="error" sx={{ borderRadius: '8px' }} onClick={handleDialog}>
              Tambah Data
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          valueSelect={selectValue}
          onCancel={handleCancelSubmit}
          onConfirm={handleConfirmSubmit}
          confirmTitle="Tambah Data"
        />
      )}
    </MainCard>
  );
};

export default ArticleAdd;
