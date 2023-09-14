import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import CommonIcons from 'components/CommonIcons';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import SimpleBarReact from 'simplebar-react';
import { RouteBase } from 'constants/routeUrl';
import 'simplebar/src/simplebar.css';

import Logo from '../../assets/logos/logo.svg';
import LogoMedic from '../../assets/logos/logoMedic.svg';
import LeftMenu from './Components/LeftMenu';
import { leftmenu } from 'constants/leftmenu';
import Background from '../../assets/images/background.svg';
import { useEffect } from 'react';
import { BASE_IMAGE } from 'constants/api';
import CommonStyles from 'components/CommonStyles';
import httpServices from 'services/httpServices';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 306;
const headerHeight = 60;
const logoHeight = 205;

const useStyles = makeStyles((theme) => {
  return {
    eachLink: {
      textDecoration: 'none',
      color: 'inherit',
      width: '100%',

      '&.active': {
        backgroundColor: theme.custom.colors.black,
        color: theme.custom.colors.white,
        '& .icon': {
          color: theme.custom.colors.white,
        },
      },
    },
    toolbar: {
      background: theme.custom.colors.white,
      color: theme.custom.colors.white,
      padding: '0px !important',
    },
    divider: {
      borderColor: `${theme.custom.colors.lightblue} !important`,
    },
    topDrawer: {
      background: theme.custom.colors.white,
      border: 0,
      display: 'flex',
      position: 'sticky !important',
      justifyContent: 'center',
      cursor: 'pointer',
      top: 0,
      zIndex: 2,
      padding: '10px',
      gap: '10px',
      fontWeight: 'bold',
      fontSize: '1.5rem',
      '& .topDrawer_logo': {
        height: logoHeight,
        width: '250px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    paddingTopDrawer: {
      marginTop: headerHeight,
      overflow: 'hidden',
    },
    backgroundContainer: {
      backgroundColor: '#F5FBFF',
      top: 0,
      width: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${Background})`,
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
      backgroundAttachment: 'fixed',
    },
    backgroundImage: {},
    containerStyle: {
      paddingTop: 40,
      paddingLeft: 40,
      paddingRight: 40,
    },
  };
});

const propTypes = {
  topDrawer: PropTypes.node,
  header: PropTypes.node,
  leftMenu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.any,
      path: PropTypes.string,
    }),
  ),
};

const LayoutWithDrawerAndAppbar = (props) => {
  //! State
  const { topDrawer, header, headerContent, window, children, leftMenu = [] } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  //! Function
  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen((mobileState) => !mobileState);
  }, []);

  const handleClickLogo = () => {};

  //! Render
  const drawer = (
    <div className={classes.paddingTopDrawer}>
      <Toolbar className={classes.topDrawer} onClick={handleClickLogo}>
        <div
          style={{
            backgroundImage: `url(https://product.hstatic.net/1000160337/product/lookup_one_piece_roronoa_zoro__4__4c663e0725c348a1be096f93fc39711d_master.jpg)`,
          }}
          className="topDrawer_logo"
        ></div>
      </Toolbar>
      <SimpleBarReact style={{ maxHeight: 'calc(100vh - 310px)' }}>
        <LeftMenu leftMenu={leftMenu} />
      </SimpleBarReact>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <SimpleBarReact style={{ maxHeight: 'calc(100vh - 0px)' }}>
      <Box className={classes.backgroundContainer} sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: '100%',
            boxShadow: 'none',
            background: theme.custom.colors.white,
          }}
        >
          <Toolbar className={classes.toolbar}>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <CommonStyles.Button
                sx={{
                  color: '#000000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                variant="text"
                onClick={handleDrawerToggle}
              >
                <CommonIcons.Menu />
              </CommonStyles.Button>
            </Box>
            {header}
          </Toolbar>
        </AppBar>

        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          className={classes.paddingTopDrawer}
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, padding: 0 }}
        >
          <div className={classes.containerStyle}>
            <div>{headerContent}</div>
            <div>{children}</div>
          </div>
        </Box>
      </Box>
    </SimpleBarReact>
  );
};

LayoutWithDrawerAndAppbar.propTypes = propTypes;
export default LayoutWithDrawerAndAppbar;
