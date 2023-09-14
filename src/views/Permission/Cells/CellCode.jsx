import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Tooltip } from '@mui/material';
import { getBranchesNames, toAcronym } from 'helpers/userlistHelpers';

const useStyles = makeStyles((theme) => {
  return {
    eachCode: {
      display: 'flex',
      alignItems: 'baseline',
      flexDirection: 'column',
      '& .branchBox': {
        display: 'flex',
        maxWidth: '150px',
        flexWrap: 'wrap',
        gap: '5px',
        marginTop: '10px',
      },
    },
    codeBranch: {
      background: '#ebf2fe',
      borderRadius: '4px',
      padding: '0px 8px',
      textTransform: 'uppercase',
    },
    department: {
      padding: '0 8px',
      backgroundColor: '#EBF2FE',
      borderRadius: 4,
    },
  };
});

const CellCode = ({ row }) => {
  //! State
  const classes = useStyles();

  //! Function

  //! Render
  return (
    <div className={classes.eachCode}>
      <span>{row?.staffCode}</span>
      <Tooltip
        title={<span style={{ whiteSpace: 'pre-line' }}>{getBranchesNames(row?.branchDetails)}</span>}
        followCursor
        arrow
      >
        <div className="branchBox">
          {row?.branchDetails?.map((item, index) => {
            if (index >= 2) return;
            return (
              <Box key={item?.id} className={classes.department}>
                {toAcronym(item?.name)}
              </Box>
            );
          })}
        </div>
      </Tooltip>
    </div>
  );
};

export default CellCode;
