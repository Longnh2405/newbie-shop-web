import React from 'react';
import { makeStyles } from '@mui/styles';
import { BASE_IMAGE } from 'constants/api';

const useStyles = makeStyles((theme) => {
  return {
    permissionCellName: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      '& > img': {
        width: '2rem',
        height: '2rem',
        objectFit: 'cover',
        borderRadius: '50%',
      },
    },
    title: {
      color: '#434e74',
      fontWeight: 'bold',
      paddingLeft: 12,
    },
  };
});

const CellName = ({ row }) => {
  //! State
  const classes = useStyles();

  //! Function

  //! Render
  return (
    <div className={classes.permissionCellName}>
      {!!row?.avatar ? (
        <img src={`${BASE_IMAGE}${row?.avatar}`} alt={row?.fullname} />
      ) : (
        <img src="https://i.stack.imgur.com/l60Hf.png" alt="Default" />
      )}

      <span className={classes.title}>{row?.fullname}</span>
    </div>
  );
};

export default CellName;
