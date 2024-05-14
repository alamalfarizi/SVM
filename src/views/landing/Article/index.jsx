import { Alert, Box, Container, Typography } from '@mui/material';
import PublicLayout from '../../../layout/LandingLayout';
import Hero from '../../../ui-component/landing/Hero';
import CardLanding from '../../../ui-component/landing/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getArticleAll, getArticleById } from '../../../store/actions/ArticleAction';
import CenteredCircularProgress from '../../../ui-component/CircularProgress';

const ArticlePage = () => {
  const backgroundImage = 'https://res.cloudinary.com/ddugt5n5v/image/upload/v1715240242/SKRIPSI/images_dy1wrd.jpg';
  const dispacth = useDispatch();
  const { loading, error } = useSelector((state) => state.article);
  const articleData = useSelector((state) => state.article);


  useEffect(() => {
    console.log(articleData);
    dispacth(getArticleAll());
  }, [dispacth]);



  return (
    <PublicLayout>
      <Hero
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: '#7fc7d9',
          backgroundPosition: 'center'
        }}
      />
      <Container sx={{ marginY: 5 }}>
        <Typography variant="h3" color="error.main" sx={{ marginY: 2 }}>
          Article Page
        </Typography>
        {loading ? (
          <Container align="center" sx={{ marginY: 5 }}>
            <CenteredCircularProgress />
          </Container>
        ) : error ? (
          <Box>
            <Alert severity="error">Error : {error}</Alert>
          </Box>
        ) : articleData.all === null || articleData.all.length === 0 ? (
          <Box sx={{ marginY: 5 }}>
            <Alert severity="info">Data Tidak Ditemukan</Alert>
          </Box>
        ) : (
          <Box>
            {articleData?.all?.map((article) => (
              <CardLanding key={article.id} article={article} />
            ))}
          </Box>
        )}
      </Container>
    </PublicLayout>
  );
};

export default ArticlePage;
