import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';

const useStyles = makeStyles((theme) => {
  return {};
});

const HeadLabel = ({ label = 'label', customHead }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  if (customHead) {
    const staffCode = t('common:userlist_staffCode');
    const department = t('common:userlist_department');
    return customHead(staffCode, department);
  }

  return `${t(`common:${label}`)}`;
};

export default HeadLabel;
