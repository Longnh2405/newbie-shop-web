import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';

const useStyles = makeStyles((theme) => {
  return {
    CellItem: {},
  };
});

const CellItem = ({ data, emptyTitle = 'N/A' }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return <div className={classes.CellItem}>{data ? data : emptyTitle}</div>;
};

export default CellItem;
