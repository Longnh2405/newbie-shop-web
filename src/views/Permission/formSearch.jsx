import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { InputAdornment } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import InputField from 'components/CustomField/InputField';
import { Box } from '@mui/system';
import { REQUIRED_FIELD } from 'helpers/messages';
import * as Yup from 'yup';
import i18n from 'i18n';

const propTypes = {};

const useStyles = makeStyles((theme) => {
  return {
    filter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: '20px 0',
    },
    inputFilter: {
      width: '70%',
      paddingRight: 12,
    },
    inputFilterInner: {
      '& > div': {
        background: theme.custom.colors.white,
      },
    },
    btnFilter: {
      width: '30%',
      '& button': {
        width: '100%',
      },
    },
  };
});

const FormSearch = ({ handleSearch, rowsSelected }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  //! Function
  const validationSchema = Yup.object().shape({});

  const onSearch = (values) => {
    handleSearch('search')(values.searchText);
  };

  //! Render
  return (
    <Formik
      initialValues={{
        searchText: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSearch(values)}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className={classes.filter}>
            <Box className={classes.inputFilter}>
              <Field
                className={classes.inputFilterInner}
                name="searchText"
                placeholder="Nhập mã đơn hàng, tên khách hàng hoặc SĐT khách hàng"
                component={InputField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CommonIcons.Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box className={classes.btnFilter}>
              <CommonStyles.Button type="submit">{t('common:search')}</CommonStyles.Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

FormSearch.propTypes = propTypes;
export default FormSearch;
