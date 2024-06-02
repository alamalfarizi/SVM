import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import { Container, Box } from '@mui/material';

const HeroLayoutRoot = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
    minHeight: 450,
    maxHeight: 1100
  }
}));

const Background = styled('div')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2
});

function Hero(props) {
  const { sxBackground, children } = props;

  return (
    <HeroLayoutRoot>
      <Container
        sx={{
          // mt: 3,
          mb: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.5,
            zIndex: -1
          }}
        />
        <Background sx={sxBackground} />
      </Container>
    </HeroLayoutRoot>
  );
}

Hero.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object
  ])
};

export default Hero;
