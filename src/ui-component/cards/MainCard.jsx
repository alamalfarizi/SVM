import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      isGoBack = false,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {title && (
          <CardHeader
            sx={headerSX}
            title={darkTitle ? <Typography variant="h3">{title}</Typography> : title}
            action={
              secondary ? (
                secondary
              ) : isGoBack ? (
                // <Button variant="contained" color="primary" onClick={() => handleGoBack()}>
                //   X
                // </Button>
                <IconButton onClick={() => handleGoBack()} >
                  <ClearOutlinedIcon className="point" sx={{fontSize: "16px"}}/>
                </IconButton>
              ) : null
            }
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
