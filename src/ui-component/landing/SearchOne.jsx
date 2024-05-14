import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper, useMediaQuery } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import DialogFilters from './DialogFilters';
import Transitions from '../cards/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons-react';
import { shouldForwardProp } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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
  background: theme.palette.error.light,
  color: theme.palette.error.dark,
  '&:hover': {
    background: theme.palette.error.dark,
    color: theme.palette.error.light
  }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState, filter }) => {
  const theme = useTheme();

  return (
    <OutlineInputStyle
      id="input-search-header"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
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
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState('');
  const [dataSearch, setDataSearch] = useState();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setDataSearch(searchInput);
    }
  };

  useEffect(() => {
    console.log(dataSearch);
  }, [dataSearch]);

  return (
    <>
      <Box sx={{ display: { xs: 'block', lg: 'none' }, ml: isHomePage ? -2 : 16, my: 2 }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
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
                              <MobileSearch value={searchInput} setValue={setSearchInput} popupState={popupState} />
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
          onKeyPress={handleKeyPress}
        
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
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