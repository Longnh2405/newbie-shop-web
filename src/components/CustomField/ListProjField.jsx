import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { get } from 'lodash';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import Cancel from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => {
  return {
    rootInput: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 14,
    },
    placeholder: {
      color: theme.custom.colors.lightgray,
    },
    iconDelete: {
        color: `${theme.custom.colors.darkblue} !important`,
        backgroundColor: '#F1F2F4',
        borderRadius: '5px',
        // backgroundColor: 'red',
        width: '20px !important',
        height: '20px !important',
        padding: 5,
        float: 'right'
    },
    listProj: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      '& > .m-r-35 > span': {
        marginBottom: 8,
        fontWeight: 600,
      },
    },
    labelHeaderColorPrimary: {
      color: `${theme.custom.colors.darkblue} !important`,
    },
  };
});

const dataProject = [
  {
    value: 'Medicskin',
    label: 'Medicskin',
  },
  {
    value: 'Mayo',
    label: 'Mayo',
  },
  {
    value: 'Johnson',
    label: 'Johnson',
  },
]

const ListProjField = (props) => {
  //! State
  const { labelFolder, form, fullWidth = true, LabelColorPrimary } = props;

  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  //! Function

  //! Render
  return (
    <FormControl fullWidth={fullWidth} className={classes.rootInput}>
      {/* <InputLabel id={name}>{label}</InputLabel> */}
      <div className={classes.listProj}>
        <div className='m-r-35'>
          {!!labelFolder && <span className={LabelColorPrimary ? classes.labelHeaderColorPrimary : ''}>{labelFolder}</span>}
        </div>
        <Stack direction="row" spacing={3}>
          {
            (dataProject || []).map((data, index) => {
              return (
                <Chip key={index} label={data.label} variant='filled' onDelete={handleDelete} deleteIcon={<Cancel className={classes.iconDelete} />} />
              )
            })
          }
        </Stack>
      </div>
    </FormControl>
  );
};

export default ListProjField;
