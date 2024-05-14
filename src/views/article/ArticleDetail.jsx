// mui material
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getArticleById, updateArticle } from '../../store/actions/ArticleAction';
import { useParams } from 'react-router-dom';
import ConfirmDialog from '../../ui-component/ConfirmDialog';
import { toastNotif, ToastStatus } from '../../utils/Toast';

// ==============================|| ARTICLE DETAIL ||============================== //

const ArticleDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isConfirmDialog, setConfirmDialog] = useState(false);
  const [selectValue, setSelectValue] = useState('Artikel');
  const [values, setValues] = useState({
    title: '',
    description: '',
    author: '',
    picture_url: null
  });

  const { loading } = useSelector((state) => state.article);
  const articleState = useSelector((state) => state.article.detail);

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

  const handleCancel = () => {
    setConfirmDialog(false);
  };

  const handleDialog = () => {
    setConfirmDialog(true);
  };

  const handleSubmit = () => {
    console.log(values);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('author', values.author);
    formData.append('picture', values.picture);
    dispatch(updateArticle({ id, formData }))
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

  useEffect(() => {
    if (id) {
      dispatch(getArticleById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (articleState) {
      setValues({
        title: articleState.title,
        description: articleState.description,
        author: articleState.author,
        picture_url: articleState.picture_url
      });
    }
  }, [articleState]);
  return (
    <MainCard title="Article Detail" isGoBack={true}>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField type="text" disabled fullWidth label="Kode Artikel" size="small" multiline value={articleState.article_id} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              name="title"
              fullWidth
              label="Judul"
              size="small"
              multiline
              value={values.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              name="description"
              fullWidth
              label="Deskripsi"
              size="small"
              multiline
              value={values.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              name="author"
              fullWidth
              label="Penulis"
              size="small"
              multiline
              value={values.author}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField type="file" fullWidth size="small" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12} md={6} lg={6} />
          <Grid item xs={12} md={6} lg={6}>
            <Button variant="contained" fullWidth color="error" sx={{ borderRadius: '8px' }} onClick={handleDialog}>
              Edit Data
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isConfirmDialog && (
        <ConfirmDialog
          isOpen={isConfirmDialog}
          valueSelect={selectValue}
          onCancel={handleCancel}
          onConfirm={handleSubmit}
          confirmTitle="Edit Data"
        />
      )}
    </MainCard>
  );
};

export default ArticleDetail;
