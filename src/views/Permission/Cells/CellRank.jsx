import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';

const useStyles = makeStyles((theme) => {
  return {
    CellRank: {},
  };
});

const CellRank = ({ data, emptyTitle = 'N/A' }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const userRoleDetail = data?.userRoleDetail;
  //! Function

  //! Render
  return <div className={classes.CellRank}>{userRoleDetail ? userRoleDetail?.name : emptyTitle}</div>;
};

export default CellRank;
