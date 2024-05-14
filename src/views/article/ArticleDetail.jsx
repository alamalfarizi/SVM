// mui material
import { Box, Grid, TextField, Typography } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getArticleById } from '../../store/actions/ArticleAction';
import { useParams } from 'react-router-dom';

// ==============================|| ARTICLE DETAIL ||============================== //

const ArticleDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.article);
  const articleState = useSelector((state) => state.article.detail);

  useEffect(() => {
    console.log(articleState);
    if (id) {
      dispatch(getArticleById(id));
    }
  }, [dispatch, id]);
  return (
    <MainCard title="Article Detail" isGoBack={true}>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField type="text" fullWidth label="Kode Artikel" size="small" multiline value={articleState.article_id} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField type="text" fullWidth label="Kode Artikel" size="small" multiline value={articleState.title} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField type="text" fullWidth label="Kode Artikel" size="small" multiline value={articleState.description} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField type="text" fullWidth label="Kode Artikel" size="small" multiline value={articleState.author} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField type="text" fullWidth label="Kode Artikel" size="small" multiline value={articleState.picture_url} />
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default ArticleDetail;
