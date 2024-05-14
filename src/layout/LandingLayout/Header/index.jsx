import { useState } from 'react';

import { Link, Box, AppBar, Toolbar, Button, IconButton, Divider, MenuItem, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function HeaderPubblicLayout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2
      }}
    >
      <Box sx={{ px: 2 }}>
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '12px',
            bgcolor: theme.palette.background.paper,
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)'
                : '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)'
          })}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 0
            }}
          >
            <Box>
              <Link href="/" variant={isMobile ? 'h6' : 'h3'} color={theme.palette.error.main} underline="none">
                Pengaduan dan Pencegahan Kekerasan Seksual
              </Link>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              <Button variant="text" color="error" size="small" onClick={() => navigate('/')}>
                Beranda
              </Button>
              <Button variant="text" color="error" size="small" onClick={() => navigate('/pengaduan')}>
                Pengaduan
              </Button>
              <Button variant="text" color="error" size="small" onClick={() => navigate('/artikel')}>
                Artikel
              </Button>
              <Button variant="contained" color="error" size="small" sx={{ minWidth: 0 }} onClick={() => navigate('/login')}>
                Login
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: theme.palette.error.main }} />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: 'background.default'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem onClick={() => navigate('/')}>Beranda</MenuItem>
                <MenuItem onClick={() => navigate('/pengaduan')}>Pengaduan</MenuItem>
                <MenuItem onClick={() => navigate('/artikel')}>Artikel</MenuItem>
                <MenuItem>
                  <Button variant="contained" color="error" size="small" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default HeaderPubblicLayout;
