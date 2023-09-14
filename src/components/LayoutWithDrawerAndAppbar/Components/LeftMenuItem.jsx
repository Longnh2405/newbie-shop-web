import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';

import { ListItemButton, ListItemIcon, Collapse, Chip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    // expandIcon: {
    //   position: 'absolute',
    //   right: '10px',
    // },
    // buttonExpanded: {
    //   color: `${theme.custom.colors.darkblue} !important`,
    // },
    buttonActive: {
      background: `#fff !important`,
      '& h6': {
        fontWeight: 'bold',
        color: theme.custom.colors.blackblue,
      },
      '& path': {
        fill: theme.custom.colors.blackblue,
      },
    },
    // listItem: {
    //   '&:hover': {
    //     // background: `${theme.custom.colors.lightblue} !important`,
    //     color: '#000 !important',
    //   },
    // },
    listMenuTitle: {
      fontSize: '20px !important',
      lineHeight: '22px !important',
      color: '#A0AFBC',
    },
    boxIcon: {
      backgroundColor: '#E9ECEF',
      padding: 8,
      paddingBottom: 2,
      borderRadius: 8,
      marginRight: 16,
    },
    groupListItem: {
      marginTop: '30px',
    },
  };
});

const LeftMenuItem = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { data, level } = props;

  const navigate = useNavigate();
  const location = useLocation();
  //! Function
  const handleExpand = (elm, index) => {
    {
      elm.path && navigate(elm.path);
    }
  };

  //! Render
  return (
    <Fragment>
      {data.map((elm, index) => {
        return (
          <div className={classes.groupListItem} key={index}>
            <ListItemButton
              onClick={() => handleExpand(elm, index)}
              sx={{ pl: elm.icon ? level * 2 : level * 4, padding: '10px 16px' }}
              className={elm.path === location.pathname ? classes.buttonActive : ''}
            >
              {elm.icon && (
                <ListItemIcon sx={{ minWidth: '30px' }} className={open[index] ? classes.buttonExpanded : null}>
                  <div className={classes.boxIcon}>
                    <elm.icon />
                  </div>
                </ListItemIcon>
              )}
              <CommonStyles.Typography className={classes.listMenuTitle} variant="h6">
                {elm.label}
              </CommonStyles.Typography>
              {elm.children ? (
                open[index] ? (
                  <CommonIcons.ExpandLess className={classes.expandIcon} />
                ) : (
                  <CommonIcons.ExpandMore className={classes.expandIcon} />
                )
              ) : null}
              {elm.chip && <Chip label={elm.chip} className={classes.chip} />}
            </ListItemButton>
            {elm.children && (
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                {<LeftMenuItem data={elm.children} level={level + 1} />}
              </Collapse>
            )}
          </div>
        );
      })}
    </Fragment>
  );
};

export default LeftMenuItem;
