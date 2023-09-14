import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from 'assets/images/longLogo.png';
import {
  Badge,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';

import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiFillHome,
  AiFillSkin,
  AiFillInfoCircle,
} from 'react-icons/ai';

import { BiUser, BiNotepad, BiBell, BiMenuAltLeft } from 'react-icons/bi';
import { FaBitcoin } from 'react-icons/fa';
import Discount from 'assets/images/discount.png';
import httpServices from 'services/httpServices';
import { useCart } from 'providers/CartProvider';
import { useAuthentication } from 'providers/AuthenticationProvider';
import useTogglePopover from 'hooks/useTogglePopover';
import PopoverMui from 'components/CommonStyles/Popover';
import LogoutConfirm from 'components/HeaderLayoutContent/LogoutConfirm';
import { RouteBase } from 'constants/routeUrl';
import { useProducts } from 'providers/ProductsProvider';

const mainNav = [
  {
    display: 'Trang chủ',
    path: '/',
  },
  {
    display: 'Sản phẩm ',
    path: '/catalog',
  },
  {
    display: 'Hỗ trợ',
    path: '/support',
  },
];

const mainNavMobile = [
  {
    display: 'Trang chủ',
    path: '/',
    icon: <AiFillHome></AiFillHome>,
  },
  {
    display: 'Sản phẩm ',
    path: '/catalog',
    icon: <AiFillSkin></AiFillSkin>,
  },
  {
    display: 'Hỗ trợ',
    path: '/support',
    icon: <AiFillInfoCircle></AiFillInfoCircle>,
  },
  {
    display: 'Tài Khoản',
    path: '/user/profile',
    icon: <BiUser style={{ color: '#4267b2' }}></BiUser>,
  },
  {
    display: 'Đơn mua',
    path: '/user/purchase',
    icon: <BiNotepad style={{ color: '#4267b2' }}></BiNotepad>,
  },
  {
    display: 'Thông báo',
    path: '/user/notification',
    icon: <BiBell style={{ color: 'red' }}></BiBell>,
  },
  {
    display: 'Kho voucher',
    path: '/user/voucher',
    icon: <img style={{ height: '24px', width: '24px', color: 'red' }} src={Discount} alt="voucher" />,
  },
  {
    display: 'Coin',
    path: '/user/coin',
    icon: <FaBitcoin style={{ color: '#f6a42d' }}></FaBitcoin>,
  },
];

const useStyles = makeStyles((theme) => {
  return {
    textField: {
      '& .MuiOutlinedInput-root': {
        height: '45px',
        borderRadius: '16px',
        backgroundColor: 'inherit',
        '&:focus-within': {
          backgroundColor: '#ecf1f9',
        },
        '& fieldset': {
          border: 'none',
        },
      },

      // input: {
      //   backgroundColor: 'inherit',
      //   '&:valid': {
      //     backgroundColor: '#ecf1f9',
      //   },
      // },
    },
  };
});

const HeaderLayoutUser = (props) => {
  // //! State
  const classes = useStyles();
  // const { t } = useTranslation();
  const { isLogged } = useAuthentication();
  const { setSearchText } = useProducts();
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const { anchorEl, handleClose, open, handleClick } = useTogglePopover();

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || (document.documentElement.scrollTop > 80 && !!headerRef)) {
        headerRef?.current?.classList.add('shrink');
      } else {
        headerRef?.current?.classList.remove('shrink');
      }
    });
  }, []);

  const [value, setValue] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(RouteBase.Catalog);
    setSearchText(value);
  };
  const inputRef = useRef(null);
  const handleIconClick = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    if (pathname !== RouteBase.Catalog) setValue('');
  }, [pathname]);

  //! Render
  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="header__menu">
          <div className="header__menu__left">
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
              >
                <Link to={item.path}>
                  <span> {item.display}</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item ">
              <div className="icon">
                <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    inputRef={inputRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleIconClick}>
                            <AiOutlineSearch className="icon-search" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    // required
                  />
                </form>
              </div>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <Badge
                  sx={{
                    '&:hover .MuiBadge-badge': { color: 'white' },
                  }}
                  badgeContent={cartItems.length}
                  color="primary"
                >
                  <div className="icon">
                    <AiOutlineShoppingCart />
                  </div>
                </Badge>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              {isLogged ? (
                <div className="icon" onClick={handleClick}>
                  <AiOutlineUser></AiOutlineUser>
                </div>
              ) : (
                <Link to="/login">
                  <Button
                    sx={{
                      '&:hover': { color: 'white' },
                    }}
                    variant="contained"
                  >
                    Đăng nhập
                  </Button>{' '}
                </Link>
              )}
            </div>
            <PopoverMui open={open} anchorEl={anchorEl} onClose={handleClose}>
              <Box
                sx={{
                  width: 200,
                }}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate(RouteBase.ProfileUserTab)}>
                      <ListItemIcon>
                        <CommonIcons.User />
                      </ListItemIcon>
                      <ListItemText primary="Trang cá nhân" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <LogoutConfirm />
                  </ListItem>
                </List>
              </Box>
            </PopoverMui>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayoutUser;
