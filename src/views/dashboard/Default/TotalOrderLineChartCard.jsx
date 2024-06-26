import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';


// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonTotalOrderCard from '../../../ui-component/cards/Skeleton/EarningCard';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionAll } from '../../../store/actions/QuestionAction';
import { useNavigate } from 'react-router';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.success.main,
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.success.main,
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questionState = useSelector((state) => state.question.all);
  const [values, setValues] = useState(questionState?.length);

  useEffect(() => {
    dispatch(getQuestionAll());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item sx={{ ml: -1.6 }}>
                <Button onClick={() => navigate(`/data/data-check`)}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.success.main,
                      color: '#fff'
                    }}
                  >
                    <LocalMallOutlinedIcon fontSize="inherit" />
                  </Avatar>
                </Button>
              </Grid>
              <Grid item sx={{ mb: 3 }}>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 2, mt: 0.2 }}>{values}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: theme.palette.primary.light
                          }}
                        >
                          Total Data Pertanyaan
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
