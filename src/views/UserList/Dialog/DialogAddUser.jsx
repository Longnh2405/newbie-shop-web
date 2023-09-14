import React, { Fragment, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@mui/styles';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import CustomField from 'components/CustomField';
import { REQUIRED_FIELD } from 'helpers/messages';
import { useTranslation } from 'react-i18next';
import i18n from 'i18n';
import { useRef } from 'react';
import { isEmpty } from 'lodash';
import { showError, showSuccess } from 'helpers/toast';
import { useQueryClient } from 'react-query';
import { queryKeys } from 'constants/index';
import ContentDialog from './ContentDialog';

const options = [
  {
    value: '1',
    label: 'Nữ',
  },
  {
    value: '0',
    label: 'Nam',
  },
];

const useStyles = makeStyles((theme) => {
  return {
    headerPopupAddUser: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 36,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: theme.custom.colors.white,
      '& .label-add-user': {
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'uppercase',
        lineHeight: '24px',
        paddingBottom: '15px',
        borderBottom: '2px solid #ddd',
        color: '#112957',
      },
      '& .icon-close-header-add-user': {
        height: '0%',
        padding: '15px',
        backgroundColor: '#F1F2F4',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        '&:active': {
          borderRadius: '12px',
          backgroundColor: '#ccc',
        },
      },
    },
    footerPopupAddUser: {
      marginTop: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '20px',
    },
    fieldBox: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      width: '100%',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      gap: '40px',
      marginBottom: '30px',
    },
    fieldNote: {
      marginBottom: '30px',
    },
    loading: {
      width: '24.5px !important',
      height: '24.5px !important',
    },
    tab: {
      border: '1px solid #C6CCD3 !important',
      borderTopLeftRadius: '8px !important',
      borderTopRightRadius: '8px !important',
      color: '#434D56 !important',
      opacity: '1 !important',
    },
    tabActive: {
      borderTopLeftRadius: '8px !important',
      borderTopRightRadius: '8px !important',
      color: '#ffffff !important',
      opacity: '1 !important',
      backgroundColor: '#6BB8F4 !important',
    },
    labelField: {
      fontWeight: 600,
      color: theme.custom.colors.darkblue,
      marginBottom: 8,
    },
    blockImg: {
      minWidth: '100%',
      minHeight: '120px',
      borderRadius: '12px',
      border: `1px solid ${theme.custom.colors.grayborder}`,
      // display: 'flex',
      // flexWrap: 'wrap',
    },
    imgWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      flexWrap: 'wrap',
      gap: '12px',
      // position: 'relative',
    },
    imageItem: {
      position: 'relative',
    },
    IconButton: {
      width: '10px !important',
      height: '10px !important',
      color: '#fff',
    },
    ButtonClose: {
      background: 'red',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'absolute',
      top: -6,
      left: '90px',
      zIndex: 10,
    },
    image: {
      width: '100px',
      height: '90px',
      objectFit: 'scale-down',
      border: '1px dashed #ddd',
    },
  };
});

const DialogAddUser = ({ open, toggle, item, refetch }) => {
  //! State
  const classes = useStyles();

  //! Function

  //! Render

  return (
    <CommonStyles.Modal
      open={open}
      toggle={toggle}
      disableClickOutside
      content={<ContentDialog toggle={toggle} item={item} refetch={refetch} />}
    />
  );
};
export default DialogAddUser;
