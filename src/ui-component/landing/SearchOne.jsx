import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper, useMediaQuery } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from '../cards/extended/Transitions';

// assets
import { IconSearch, IconX } from '@tabler/icons-react';
import { shouldForwardProp } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { submitTicket } from '../../store/actions/PengaduanAction';
import { toastNotif, ToastStatus } from '../../utils/Toast';
import { useNavigate } from 'react-router';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-55px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px'
  }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: '100%',
  marginTop: 8,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    background: '#fff'
  }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  background: theme.palette.success.light,
  color: theme.palette.success.dark,
  '&:hover': {
    background: theme.palette.success.dark,
    color: theme.palette.success.light
  }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, handleSubmit, popupState, filter }) => {
  const theme = useTheme();

  return (
    <OutlineInputStyle
      id="input-search-header"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Cari pengaduan"
      startAdornment={
        <InputAdornment position="start">
          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleSubmit}>
            <HeaderAvatarStyle variant="rounded">
              <IconSearch stroke={1.5} size="1.3rem" />
            </HeaderAvatarStyle>
          </ButtonBase>
          <Box sx={{ ml: 2 }}>
            <ButtonBase sx={{ borderRadius: '12px' }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  background: theme.palette.orange.light,
                  color: theme.palette.orange.dark,
                  '&:hover': {
                    background: theme.palette.orange.dark,
                    color: theme.palette.orange.light
                  }
                }}
                {...bindToggle(popupState)}
              >
                <IconX stroke={1.5} size="1.3rem" />
              </Avatar>
            </ButtonBase>
          </Box>
        </InputAdornment>
      }
      aria-describedby="search-helper-text"
      inputProps={{ 'aria-label': 'weight' }}
    />
  );
};

MobileSearch.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchOne = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [dataSearch, setDataSearch] = useState();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setDataSearch(searchInput);
      dispatch(submitTicket({ ticket: searchInput }))
        .unwrap()
        .then((val) => {
          console.log(val);
          if (val.error === false) {
            toastNotif(ToastStatus.SUCCESS, val.message);
            navigate(`/result/${val.data.report.id_report}`);
          }
        })
        .catch((error) => {
          console.log(error);
          toastNotif(ToastStatus.ERROR, 'engaduan tidak ditemukan');
        });
    }

    dispatch(submitTicket({ ticket: searchInput }))
      .unwrap()
      .then((val) => {
        console.log(val);
        if (val.error === false) {
          toastNotif(ToastStatus.SUCCESS, val.message);
          navigate(`/result/${val.data.report.id_report}`);
        }
      })
      .catch((error) => {
        toastNotif(ToastStatus.ERROR, 'Pengaduan tidak ditemukan');
      });
  };

  const handleSearchInput = (event) => {
    if (searchInput === '') {
      toastNotif(ToastStatus.ERROR, 'Masukkan tiket pengaduan');
    } else {
      handleKeyPress(event);
    }
  };

  useEffect(() => {
    console.log(dataSearch);
  }, [dataSearch]);

  return (
    <>
      <Box sx={{ display: { xs: 'block', lg: 'none' }, my: 2 }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 0 }}>
                <ButtonBase sx={{ borderRadius: '12px' }}>
                  <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                    <IconSearch stroke={1.5} size="1.2rem" />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center' }}>
                      <Card
                        sx={{
                          background: '#fff',
                          [theme.breakpoints.down('sm')]: {
                            border: 0,
                            boxShadow: 'none'
                          }
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs>
                              <MobileSearch
                                value={searchInput}
                                setValue={setSearchInput}
                                popupState={popupState}
                                handleSubmit={handleSearchInput}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutlineInputStyle
          id="input-search-header"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleSearchInput}
          placeholder="Cari pengaduan dengan memasukkan tiket pengaduan"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleSearchInput}>
                <HeaderAvatarStyle variant="rounded">
                  <IconSearch stroke={1.5} size="1.3rem" />
                </HeaderAvatarStyle>
              </ButtonBase>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'weight' }}
        />
      </Box>
    </>
  );
};

export default SearchOne;
