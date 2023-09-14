import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    CellItemNote: {
      maxWidth: '200px',
      minWidth: '150px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };
});

const CellItemNote = ({ data, emptyTitle = 'N/A' }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <Tooltip title={data || ''}>
      <div className={classes.CellItemNote}>{data ? data : emptyTitle}</div>
    </Tooltip>
  );
};

export default CellItemNote;
